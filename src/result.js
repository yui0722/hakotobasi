//result

var gameoverLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();
        // 画像の追加
        var sprite = cc.Sprite.create(res.gameover_png);
        sprite.setPosition(size.width / 2, size.height  / 2);
        sprite.setScale(0.8);
        this.addChild(sprite, 0);

        var sprite = cc.Sprite.create(res.exit_png);
        sprite.setPosition(size.width / 2, size.height  / 3);
        sprite.setScale(0.7);
        this.addChild(sprite, 0);

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
return true;
},
onTouchMoved: function(touch, event) {},
onTouchEnded: function(touch, event) {
  SceneAnime = cc.TransitionFade.create(2, new TitleScene());
  cc.director.runScene(SceneAnime)
},
});

var gameoverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        // 背景レイヤーをその場で作る
        //ラベルとタップイベント取得
        var layer3 = new gameoverLayer();
        this.addChild(layer3);

    }
});
