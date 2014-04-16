package net.squarelabs;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UploadServlet extends HttpServlet {
    private static final Logger log = LoggerFactory.getLogger(UploadServlet.class);

    private static final Pattern pattern = Pattern.compile("^bytes (\\d+)-(\\d+)/(\\d+)$");

    private static final int BUFF_SIZE = 20 * 1024;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        log.debug("test");
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        File tmp = File.createTempFile("test", ".tmp");
        try {
            // Get position
            long start = 0;
            long end = 0;
            long length = 0;
            Matcher matcher = pattern.matcher(req.getHeader("Content-Range"));
            while (matcher.find()) {
                start = Long.parseLong(matcher.group(1));
                end = Long.parseLong(matcher.group(2));
                length = Long.parseLong(matcher.group(3));
            }
            if(start < 0 || end < 0 || length < 0 || start >= end || end > length+1) {
                throw new ServletException("Invalid Content-Range");
            }

            // Check for validity
            File dir = tmp.getParentFile();
            File file = new File(dir, req.getPathInfo());
            String path = file.getAbsolutePath().substring(0, dir.getAbsolutePath().length());
            if(!StringUtils.equals(path, dir.getAbsolutePath())) {
                throw new ServletException("Illegal path!"); // Prevent reverse directory traversal
            }

            // Create file
            if(!file.exists()) {
                if(!file.createNewFile()) {
                    throw new IOException("Error creating file!");
                }
            }

            // Write to it
            byte[] buff = new byte[BUFF_SIZE];
            try(RandomAccessFile raf = new RandomAccessFile(file, "rw")) {
                raf.seek(start);
                int count;
                while((count = req.getInputStream().read(buff)) >= 0) {
                    if(count == 0) {
                        Thread.sleep(100); // Waiting on data
                    } else {
                        raf.write(buff, 0, count);
                    }
                }
                if(raf.getFilePointer() >= length) {
                    // TODO: Write to a database blob or something application-specific
                    log.info("Received whole file: {}", file.getAbsolutePath());
                }
            } catch (InterruptedException ex) {
                throw new IOException(ex);
            }
        } finally {
            tmp.delete();
        }
    }
}
