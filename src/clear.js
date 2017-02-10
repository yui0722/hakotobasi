var tugiBox;
var tugisprite;
var modorusprite;
var modoruBox;
var pickedTiles = [];
var tugi_flg = false;
var modoru_flg = false;
var clearLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        background = new cc.Sprite(res.background_png);
        background.setPosition(size.width / 2, size.height / 2);
        this.addChild(background);

        for (i = 0; i < 1; i++) {
            var tile = new MemoryTile();
            var tile8 = new MemoryTile8();
            //  tugisprite.setPosition(size.width / 2, size.height / 2);
            tile.setScale(0.6);
            tile8.setScale(0.6);
            this.addChild(tile, 0);
            this.addChild(tile8, 0);
            //タイルを格子状に配置する計算式
            tile.setPosition(size.width / 2, size.height / 2);
            tile8.setPosition(size.width / 2, size.height / 3);
            //this.setPosition(100,100);
        }

        var label = cc.LabelTTF.create("ステージクリア!!", "ゆたぽん（コーディング）", 26);
        label.setPosition(size.width / 2, size.height * 5 / 6);
        label.setScale(1.2);
        this.addChild(label, 1);


        if (t <= 0) {
            scoreText = cc.LabelTTF.create("Score:" + t + 10, "ゆたぽん（コーディング）", "24", cc.TEXT_ALIGNMENT_CENTER);
            this.addChild(scoreText, 1);
            scoreText.setPosition(size.width / 2, size.height / 1.5);
            scoreText.setScale(1.2);
        }

        if (i <= 0) {
            scoreText = cc.LabelTTF.create("Score:" + t * 1, "ゆたぽん（コーディング）", "24", cc.TEXT_ALIGNMENT_CENTER);
            this.addChild(scoreText, 1);
            scoreText.setScale(1.2);
            scoreText.setPosition(size.width / 2, size.height / 1.5);
        }

        scoreText = cc.LabelTTF.create("Score:" + t * f, "ゆたぽん（コーディング）", "24", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText, 1);
        scoreText.setScale(1.2);
        scoreText.setPosition(size.width / 2, size.height / 1.5);
    }
});

var MemoryTile = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.tugi_png);
        cc.eventManager.addListener(listener.clone(), this);
    }
});

var MemoryTile8 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.modoru_png);
        cc.eventManager.addListener(listener9.clone(), this);
    }
});


var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            target.initWithFile("res/tugi.png");
            pickedTiles.push(target);
            f = 5;
            t = 3001
            stage =  stage + 1;
            SceneAnime = cc.TransitionFade.create(2, new gameScene2());
            cc.director.runScene(SceneAnime);
        }
    }
});

var listener9 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            target.initWithFile("res/modoru.png");
            pickedTiles.push(target);
            SceneAnime = cc.TransitionFade.create(2, new TitleScene());
            cc.director.runScene(SceneAnime);
        }
    }
});



var clearScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        //ラベルとタップイベント取得
        var layer3 = new clearLayer();
        this.addChild(layer3);

    }
});
