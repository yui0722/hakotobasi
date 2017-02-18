var world;
var shapeArray = [];
var startTouch;
var endTouch;
var touching = false;
var dX = 0;
var dY = 0;
var dZ = 0;
var touchflag = false;
var totem_shape;
var node2;
var arrow_line;
var f = 5;
var j = 0;
var t = 3000;
var audioEngine;
var audio = true;
var stage = 0;

if (typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.totem = 0; // トーテム
    SpriteTag.destroyable = 1; //
    SpriteTag.solid = 2; //
    SpriteTag.ground = 3; //地面
    SpriteTag.hata = 4;
    SpriteTag.teki1 = 5;
    SpriteTag.teki2 = 6;
    SpriteTag.ground5 = 7;

};
var gameLayer2;
var gameScene2 = cc.Scene.extend({
    onEnter: function() {
        this._super();

        audioEngine = cc.audioEngine;
        if (audio = true) {
            if (audioEngine.isMusicPlaying()) {
                audioEngine.stopMusic();
            }
            //bgm再生
            if (!audioEngine.isMusicPlaying()) {
                audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() - 10);
                audioEngine.playMusic(res.bgm_main_mp3, true);
            }
        }
        var size = cc.director.getWinSize();
        gameLayer2 = new game2();
        gameLayer2.init();
        this.addChild(gameLayer2, 1);

        node2 = new cc.DrawNode();
        this.addChild(node2, 10);
        arrow_line2 = new cc.DrawNode();
        this.addChild(arrow_line2, 11);
        var label2 = cc.LabelTTF.create("Stage " + stage, "けいふぉんと", 26);
        label2.setPosition(size.width / 6, size.height / 1.1);
        this.addChild(label2, 1);
        jumpText2 = cc.LabelTTF.create("Jumps:" + f, "けいふぉんと", "24", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(jumpText2, 1);
        jumpText2.setPosition(size.width / 2, size.height / 1.1);

        bonusText2 = cc.LabelTTF.create("Bonus:" + t, "けいふぉんと", "24", cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(bonusText2, 1);
        bonusText2.setPosition(size.width / 1.3, size.height / 1.1);

        background = new cc.Sprite(res.background_png);
        background.setPosition(size.width / 2, size.height / 2);
        this.addChild(background);

        for (i = 0; i < 1; i++) {
            var tile = new MemoryTile5();
            //  tugisprite.setPosition(size.width / 2, size.height / 2);
            tile.setScale(0.6);
            this.addChild(tile, 0);
            //タイルを格子状に配置する計算式
            tile.setPosition(size.width / 1.2, size.height / 9);
            //this.setPosition(100,100);
        }


        for (i = 0; i < 1; i++) {
            var tile = new MemoryTile62();
            //  tugisprite.setPosition(size.width / 2, size.height / 2);
            tile.setScale(0.6);
            this.addChild(tile, 0);
            //タイルを格子状に配置する計算式
            tile.setPosition(size.width / 1.2, size.height / 6);
            //this.setPosition(100,100);
        }


        var sankaku = [new cc.Point(0, 0),
            new cc.Point(-8, -10),
            new cc.Point(-3, -10),
            new cc.Point(0, -20),
            new cc.Point(3, -10),
            new cc.Point(8, -10),
        ]

        var fillColor = new cc.Color(255, 255, 128, 128);
        var lineWidth = 1;
        var lineColor = new cc.Color(255, 255, 255, 128);
        node2.drawPoly(sankaku, fillColor, lineWidth, lineColor);
        node2.setPosition(size.width / 2, size.height / 2);

        this.scheduleUpdate();

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
        startTouch = touch.getLocation();


        node2.setPosition(startTouch);

        return true;
    },
    onTouchMoved: function(touch, event) {
        endTouch = touch.getLocation();

        touching = true;
    },
    onTouchEnded: function(touch, event) {
        endTouch = touch.getLocation();
        touching = false;
        //i = i - 1;

        if (touchflag == true) {
            totem_shape.body.applyImpulse(cp.v(dX * -2, dY * -2), cp.v(10, 0))
            f = f - 1;
            jumpText2.setString("Jumps:" + f);
        }

        if (f == -1) {
            jumpText2.setString("Jumps:" + 0);
            SceneAnime = cc.TransitionFade.create(1, new gameoverLayer());
            cc.director.runScene(SceneAnime)

        }
    },

    update: function(dt) {
        if (t >= 0) {
            t = t - 1;
            bonusText2.setString("Bonus:" + t);
        }
        j = j + 1;
        if (t == -1) {
            t = 0;
            bonusText2.setString("Bonus:" + t);
        }

        if (touching) {
            //現在タッチしているX座標と前回の座標の差分をとる
            arrow_line2.setVisible(true);
            node2.setVisible(true);

            this.calcDirection();
        } else {
            arrow_line2.setVisible(false);
            arrow_line2.clear();
            node2.setVisible(false);
            node2.clear();
        }

    },
    calcDirection: function() {
        dX = endTouch.x - startTouch.x;
        dY = endTouch.y - startTouch.y;
        dZ = Math.sqrt(dX * dX + dY * dY);

        //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
        if (dZ > 60) {

            //角度（ラジアン）を求める
            var radian = Math.atan2(dY, dX)
            //角度（ラジアン）を角度（度数）に変換
            var angle = radian * 180 / Math.PI;
            //前回の描画を消す
            arrow_line2.clear();
            node2.clear();


            //ドラックした長さを矢印のしっぽの位置にする
            var sankaku = [new cc.Point(0, 0),
                new cc.Point(-35, -35),
                new cc.Point(-15, -35),
                new cc.Point(0, -(dZ - 10)),
                new cc.Point(15, -35),
                new cc.Point(35, -35),
            ]

            //矢印を描画する
            var fillColor = new cc.Color(255, 255, 128, 128);
            var lineWidth = 1;
            var lineColor = new cc.Color(255, 255, 255, 128);
            node2.drawPoly(sankaku, fillColor, lineWidth, lineColor);
            //矢印はもともと270度の位置にあるので、回転角度を減算する
            node2.setRotation(270 - angle);

        }
    }
});

var game2 = cc.Layer.extend({
    init: function() {
        this._super();

        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);



        var myScene = new MyScene();
        //this.addChild(myScene);

        var wallBottom = new cp.SegmentShape(world.staticBody,
            cp.v(-4294967294, -100), // start point
            cp.v(4294967295, -100), // MAX INT:4294967295
            0); // thickness of wall
        world.addStaticShape(wallBottom);


                this.addBody(240, -10, 480, 20, false, res.ground_png, SpriteTag.ground5);
                this.addBody(-10, 120, 20, 450, false, res.ground2_png, SpriteTag.ground5);
                this.addBody(520, 120, 20, 450, false, res.ground2_png, SpriteTag.ground5);
                this.addBody(412, 100, 100, 20, false, res.ground4_png, SpriteTag.ground);
                this.addBody(250, 200, 100, 20, false, res.ground4_png, SpriteTag.ground);
                this.addBody(100, 100, 100, 20, false, res.ground4_png, SpriteTag.ground);
                this.addBody(250, 100, 100, 20, false, res.ground4_png, SpriteTag.ground);
                this.addBody(250, 225, 40, 36, false, res.hata_png, SpriteTag.hata);
                this.addBody(100, 140, 41, 38, true, res.teki1_png, SpriteTag.teki1);
                this.addBody(412, 140, 41, 38, true, res.teki2_png, SpriteTag.teki2);
                this.addBody(250, 110, 41, 38, true, res.totem_png, SpriteTag.totem);

        this.scheduleUpdate();
        cc.eventManager.addListener(touchListener, this);
        world.setDefaultCollisionHandler(this.collisionBegin, null, null, null);

    },
    addBody: function(posX, posY, width, height, isDynamic, spriteImage, type) {
        if (isDynamic) {
            var body = new cp.Body(1, cp.momentForBox(1, width, height));
        } else {
            var body = new cp.Body(Infinity, Infinity);
        }
        body.setPos(cp.v(posX, posY));
        var bodySprite2 = cc.Sprite.create(spriteImage);
        gameLayer2.addChild(bodySprite2, 0);
        bodySprite2.setPosition(posX, posY);
        if (isDynamic) {
            world.addBody(body);
        }

        var shape = new cp.BoxShape(body, width, height);
        shape.setFriction(1);
        shape.setElasticity(0);
        shape.name = type;
        shape.setCollisionType(type);
        shape.image = bodySprite2;
        world.addShape(shape);
        shapeArray.push(shape);

        if (type == SpriteTag.totem) {
            totem_shape = shape;
        }

    },
    update: function(dt) {

        world.step(dt);

        for (var i = shapeArray.length - 1; i >= 0; i--) {
            shapeArray[i].image.x = shapeArray[i].body.p.x
            shapeArray[i].image.y = shapeArray[i].body.p.y
            var angle = Math.atan2(-shapeArray[i].body.rot.y, shapeArray[i].body.rot.x);
            shapeArray[i].image.rotation = angle * 57.2957795;
        }
    },
    collisionBegin: function(arbiter, space) {
        /*
          if((arbiter.a.name=="totem" && arbiter.b.name=="ground") || (arbiter.b.name=="totem" && arbiter.a.name=="ground")){
              console.log("Oh no!!!!");
          }
          */

        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.ground) {
            cc.audioEngine.playEffect(res.landing_mp3);
        }
        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.hata) {
            SceneAnime = cc.TransitionFade.create(1, new clearScene());
            cc.director.runScene(SceneAnime)
        }

        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.teki2) {
            SceneAnime = cc.TransitionFade.create(1, new gameoverScene());
            cc.director.runScene(SceneAnime)
        }


        if (arbiter.a.name == SpriteTag.totem && arbiter.b.name == SpriteTag.ground5) {
            SceneAnime = cc.TransitionFade.create(1, new gameoverScene());
            cc.director.runScene(SceneAnime)
        }

        if (i == 0) {
            SceneAnime = cc.TransitionFade.create(1, new gameoverScene());
            cc.director.runScene(SceneAnime)

        }



        return true;
    },


});


var MemoryTile5 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.tugi2_png);
        cc.eventManager.addListener(listener52.clone(), this);
    }
});

var MemoryTile62 = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.tugi3_png);
        cc.eventManager.addListener(listener62.clone(), this);
    }
});

var listener52 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            target.initWithFile("res/tugi2.png");
            pickedTiles.push(target);

            SceneAnime = cc.TransitionFade.create(2, new TitleLayer());
            cc.director.runScene(SceneAnime);
        }
    }
});


var listener62 = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function(touch, event) {

        var target = event.getCurrentTarget();
        var location = target.convertToNodeSpace(touch.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            target.initWithFile("res/tugi3.png");
            pickedTiles.push(target);
            f = 5;
            t = 3001;
            SceneAnime = cc.TransitionFade.create(2, new gameScene2());
            cc.director.runScene(SceneAnime);
        }
    }
});


var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
    swallowTouches: false, // 以降のノードにタッチイベントを渡す
    onTouchBegan: function(touch, event) { // タッチ開始時
        var pos = touch.getLocation();

        console.log("shapeArray.length:", shapeArray.length)
        // すべてのshapをチェックする
        for (var i = 0; i < shapeArray.length; i++) {
            shape = shapeArray[i];
            console.log("shape.type:", i, shape.type)
            //pointQueryは物理オブジェクトの内側がタップされたかどうか判定する関数
            if (shape.name == SpriteTag.totem) {
                touchflag = true;
                return;
            }
        }
    }
});
