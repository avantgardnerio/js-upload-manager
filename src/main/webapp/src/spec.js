define([
    'spec/ChangeEventSpec',
    'spec/EventSpec',
    'spec/EventDispatcherSpec',
    'spec/FileRendererSpec',
    'spec/FileSpec',
    'spec/RowRendererSpec',
    'spec/ProgressEventSpec',
    'spec/SelectionEventSpec',
    'spec/ListSpec',
    'spec/PathUtilSpec',
    'spec/DefaultFilterSpec',
    'spec/ResizeFilterSpec',
    'spec/RingBufferSpec',
    'spec/UploadManagerSpec',
    'spec/UploadStateSpec'
], function () {
    console.log('Loaded specs!');
    window.bootJasmine();
});
