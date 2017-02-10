//title
var audioEngine;

var selectLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        // 画像の追加
        audioEngine = cc.audioEngine;
        //if (audio = false) {
        if (audioEngine.isMusicPlaying()) {
            audioEngine.stopMusic();
        }
        //}
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
            audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() - 10);
            audioEngine.playMusic(res.bgm_main_mp3, true);
        }

        var sprite = cc.Sprite.create(res.background_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(sprite, 0);


        var sprite = cc.Sprite.create(res.stage_png);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(0.7);
        this.addChild(sprite, 0);

        for (i = 0; i < 1; i++) {
            var tile = new MemoryTile2();
            var tile2 = new MemoryTile3();
            var tile7 = new MemoryTile7();
            //  tugisprite.setPosition(size.width / 2, size.height / 2);
            tile.setScale(0.6);
            tile2.setScale(0.6);
            tile7.setScale(0.6);

            this.addChild(tile, 0);
            this.addChild(tile2, 0);
            this.addChild(tile7, 0);
            //タイルを格子状に配置する計算式
            tile.setPosition(size.width / 3, size.height / 2);
            tile2.setPosition(size.width / 2, size.height / 2);
            tile7.setPosition(size.width / 1.5, size.height / 5);
            //this.setPosition(100,100);
        }
    }
});

var MemoryTile2 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.stage1_png);
        cc.eventManager.addListener(listener2.clone(), this);
    }
});

var MemoryTile3 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.stage2_png);
        cc.eventManager.addListener(listener8.clone(), this);
    }
});

var MemoryTile7 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.bgm2_png);
        cc.eventManager.addListener(listener7.clone(), this);
    }
});

var listener2 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            //target.initWithFile("res/stage1.png");
            pickedTiles.push(target);
            stage = 1;
            SceneAnime = cc.TransitionFade.create(2, new gameScene());
            cc.director.runScene(SceneAnime);
        }
    }
});


var listener7 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {

            pickedTiles.push(target);

            if (!audioEngine.isMusicPlaying()) {
                audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() - 10);
                target.initWithFile("res/bgm.png");
                audioEngine.playMusic(res.bgm_main_mp3, true);
            } else


            if (audioEngine.isMusicPlaying()) {
                audioEngine.stopMusic();

                target.initWithFile("res/bgm2.png");
            }
        }
    }
});


var listener8 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
          stage = 2;
            pickedTiles.push(target);
            SceneAnime = cc.TransitionFade.create(2, new gameScene2());
            cc.director.runScene(SceneAnime);
        }
    }
});


var selectScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        //ラベルとタップイベント取得
        var layer3 = new selectLayer();
        this.addChild(layer3);

    }
});
