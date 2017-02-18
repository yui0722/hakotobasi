cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading"))
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.enableRetina(false);
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(480, 320, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(false);
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new TitleScene());
    }, this);
};
cc.game.run();
