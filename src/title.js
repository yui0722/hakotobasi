var audioEngine;
var TitleLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        audioEngine = cc.audioEngine;
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
        }
        // 画像の追加
        var sprite = cc.Sprite.create(res.background_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(sprite, 0);

        var sprite = cc.Sprite.create(res.title_png);
        sprite.setPosition(size.width / 2, size.height / 1.5);
        sprite.setScale(1.0);
        this.addChild(sprite, 1);

        var sprite = cc.Sprite.create(res.start_png);
        sprite.setPosition(size.width / 2, size.height / 3);
        sprite.setScale(0.8);
        this.addChild(sprite, 1);

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
        return true;
    },
    onTouchBegan: function(touch, event) {
        f = 5;
        t = 3000;
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        SceneAnime = cc.TransitionFade.create(2, new selectScene());
        cc.director.runScene(SceneAnime)
    },
});
var TitleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        //ラベルとタップイベント取得
        var layer3 = new TitleLayer();
        this.addChild(layer3);

    }
});
