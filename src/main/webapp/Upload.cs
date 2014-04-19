using System;
using System.Web;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading;

namespace net.squarelabs
{
	public class UploadHandler : IHttpHandler
	{
    	private const int BUFF_SIZE = 20 * 1024;

		public bool IsReusable 
		{
			get 
			{ 
				return true; 
			}
		}

		public void ProcessRequest (HttpContext context)
		{
            // Get position
            long start = 0;
            long end = 0;
            long length = 0;
			var match = Regex.Match(context.Request.Headers["Content-Range"], "^bytes (\\d+)-(\\d+)/(\\d+)$");
            start = long.Parse(match.Groups[1].Value);
            end = long.Parse(match.Groups[2].Value);
            length = long.Parse(match.Groups[3].Value);
            if(start < 0 || end < 0 || length < 0 || start >= end || end > length+1) 
			{
                throw new Exception("Invalid Content-Range");
            }

            // Check for validity
			var tempPath = Path.GetTempPath();
			var dir = new DirectoryInfo(tempPath);
			var file = new FileInfo(Path.Combine(dir.FullName, context.Request.Path.Substring(1)));
            var path = file.FullName.Substring(0, dir.FullName.Length);
            if(path != dir.FullName) 
			{
                throw new Exception("Illegal path!"); // Prevent reverse directory traversal
            }

            // Write to it
            byte[] buff = new byte[BUFF_SIZE];
			file.Directory.Create();
            using(var raf = new FileStream(file.FullName, FileMode.OpenOrCreate, FileAccess.Write, FileShare.ReadWrite)) 
			{
                raf.Seek(start, SeekOrigin.Begin);
                int count;
                while((count = context.Request.InputStream.Read(buff, 0, BUFF_SIZE)) > 0)
                {
                    raf.Write(buff, 0, count);
                }
                if(raf.Position >= length)
                {
                    // TODO: Write to a database blob or something application-specific
                }
            } 
		}
	}
}

