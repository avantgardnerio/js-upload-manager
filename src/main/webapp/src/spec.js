define([
    'spec/ChangeEventSpec',
    'spec/EventSpec',
    'spec/EventDispatcherSpec',
    'spec/ProgressEventSpec',
    'spec/SelectionEventSpec',
    'spec/ListSpec',
    'spec/ResizeFilterSpec',
    'spec/RingBufferSpec',
    'spec/UploadManagerSpec',
    'spec/UploadStateSpec'
], function () {
    console.log('Loaded specs!');
    window.bootJasmine();
});
