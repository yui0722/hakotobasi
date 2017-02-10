var startTouch;
var endTouch;
var touching = false;


var node;
var arrow_line;

var myLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      var size = cc.director.getWinSize();


      node = new cc.DrawNode();
      this.addChild(node, 10);
      arrow_line = new cc.DrawNode();
      this.addChild(arrow_line, 11);

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
      node.drawPoly(sankaku, fillColor, lineWidth, lineColor);
      node.setPosition(size.width / 2, size.height / 2);

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


      node.setPosition(startTouch);

      return true;
   },
   onTouchMoved: function(touch, event) {
      endTouch = touch.getLocation();
      touching = true;
   },
   onTouchEnded: function(touch, event) {
      endTouch = touch.getLocation();
      touching = false;
  },

   update: function(dt) {
      if (touching) {
         //現在タッチしているX座標と前回の座標の差分をとる
         arrow_line.setVisible(true);
         node.setVisible(true);

         this.calcDirection();
      } else {
         arrow_line.setVisible(false);
         arrow_line.clear();
         node.setVisible(false);
         node.clear();
      }

   },
   calcDirection: function() {
      var dX = endTouch.x - startTouch.x;
      var dY = endTouch.y - startTouch.y;
      var dZ = Math.sqrt(dX * dX + dY * dY);

      //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
      if (dZ > 60) {

         //角度（ラジアン）を求める
         var radian = Math.atan2(dY, dX)
            //角度（ラジアン）を角度（度数）に変換
         var angle = radian * 180 / Math.PI;
         //前回の描画を消す
         arrow_line.clear();
         node.clear();


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
         node.drawPoly(sankaku, fillColor, lineWidth, lineColor);
         //矢印はもともと270度の位置にあるので、回転角度を減算する
         node.setRotation(270 - angle);

      }



   },

});

var MyScene = cc.Scene.extend({
   onEnter: function() {

     this._super();
      //ラベルとタップイベント取得
      var layer = new myLayer();
      this.addChild(layer);

   }
});
