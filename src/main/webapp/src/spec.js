define([
    'spec/ChangeEventSpec',
    'spec/EventSpec',
    'spec/EventDispatcherSpec',
    'spec/FileRendererSpec',
    'spec/ProgressEventSpec',
    'spec/SelectionEventSpec',
    'spec/ListSpec',
    'spec/DefaultFilterSpec',
    'spec/ResizeFilterSpec',
    'spec/RingBufferSpec',
    'spec/UploadManagerSpec',
    'spec/UploadStateSpec'
], function () {
    console.log('Loaded specs!');
    window.bootJasmine();
});
