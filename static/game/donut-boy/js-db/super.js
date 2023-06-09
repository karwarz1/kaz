var FaceGame;
((FaceGame = FaceGame || {}).Ammo = function (t, e, s, i, a) {
	Phaser.Sprite.call(this, t, e, s, i),
		(this.game = t),
		(this.tilemap = a),
		this.anchor.setTo(0.5),
		(this.x = Math.round(e)),
		(this.y = Math.round(s));
	var h = this.y;
	this.game.physics.arcade.enableBody(this),
		(this.body.checkCollision.up = !1),
		(this.body.allowGravity = !1),
		this.scale.setTo(0.4),
		(this.itemTween = this.game.add.tween(this)),
		this.itemTween
			.to({ y: h - 5 }, 700)
			.to({ y: h }, 700)
			.loop()
			.start();
}),
	(FaceGame.Ammo.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Ammo.prototype.constructor = FaceGame.Ammo),
	(FaceGame.Ammo.prototype.update = function () {}),
	((FaceGame = FaceGame || {}).Bagel = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, h),
			(this.game = t),
			this.game.physics.arcade.enableBody(this),
			this.anchor.setTo(0.5),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			this.scale.setTo(0.35),
			(this.health = 0.01),
			(this.spinSpeed = i || 0),
			(this.body.velocity.x = a || 100),
			this.body.bounce.setTo(1, 0),
			(this.doughSlap1SFX = this.game.add.audio('doughSlap1SFX')),
			(this.doughSlap1SFX.volume = 0.2),
			(this.doughSlap2SFX = this.game.add.audio('doughSlap2SFX')),
			(this.doughSlap2SFX.volume = 0.2),
			(this.doughSlap3SFX = this.game.add.audio('doughSlap3SFX')),
			(this.doughSlap3SFX.volume = 0.2);
	}),
	(FaceGame.Bagel.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Bagel.prototype.constructor = FaceGame.Bagel),
	(FaceGame.Bagel.prototype.update = function () {
		((this.angle = this.angle + this.spinSpeed),
		this.body.blocked.down || this.body.touching.down) &&
			((this.body.velocity.y = -269),
			this.x > this.game.camera.x &&
				this.x < this.game.camera.x + this.game.camera.width &&
				this.alive &&
				this['doughSlap' + String(Math.round(1 + 2 * Math.random())) + 'SFX'].play());
		if (this.bottom + 4 >= this.game.world.height) {
			if (!this.alive) return;
			this.kill();
		}
	}),
	(FaceGame.Bagel.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0 &&
				((this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				this.enemyEmitter.makeParticles(['crumb1', 'crumb2', 'crumb3']),
				this.game.physics.arcade.enable(this.enemyEmitter),
				(this.enemyEmitter.minParticleScale = 0.5),
				(this.enemyEmitter.maxParticleScale = 0.5),
				(this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				'jump' == e
					? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
					: 'shoot' == e &&
					  ('right' == s
							? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
							: 'left' == s &&
							  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-100, 100))),
				this.enemyEmitter.start(!0, 1e3, null, 8),
				this.kill());
	}),
	((FaceGame = FaceGame || {}).BeachBall = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.beachBall1SFX = this.game.add.audio('beachBall1SFX')),
			(this.beachBall1SFX.volume = 0.3),
			(this.beachBall2SFX = this.game.add.audio('beachBall2SFX')),
			(this.beachBall2SFX.volume = 0.3),
			(this.beachBall3SFX = this.game.add.audio('beachBall3SFX')),
			(this.beachBall3SFX.volume = 0.3),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			this.body.bounce.set(0.9, 0.9),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.alpha = 0.8);
		var o = 200 * Math.random() - 100;
		(this.body.velocity.x = o),
			(this.customParams = { originalX: this.x, originalY: this.y, spinMod: 0 });
	}),
	(FaceGame.BeachBall.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.BeachBall.prototype.constructor = FaceGame.BeachBall),
	(FaceGame.BeachBall.prototype.update = function () {
		this.angle += this.customParams.spinMod;
	}),
	((FaceGame = FaceGame || {}).BootState = {
		init: function () {
			(this.game.stage.backgroundColor = '#000'),
				(this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL),
				(this.scale.pageAlignHorizontally = !0),
				(this.scale.pageAlignVertically = !0),
				this.game.physics.startSystem(Phaser.Physics.ARCADE);
		},
		preload: function () {
			this.load.image('preloadbar', 'assets-db/images/preload-donut.png');
		},
		create: function () {
			this.state.start('Preload');
		}
	}),
	((FaceGame = FaceGame || {}).BreadCart = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, 'breadCart'),
			(this.game = t),
			(this.tilemap = i),
			this.game.physics.arcade.enableBody(this),
			this.anchor.setTo(0.5),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.immovable = !0),
			(this.body.checkCollision.left = !1),
			(this.body.checkCollision.right = !1),
			(this.body.velocity.x = 120 * h);
	}),
	(FaceGame.BreadCart.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.BreadCart.prototype.constructor = FaceGame.BreadCart),
	(FaceGame.BreadCart.prototype.update = function () {
		if (this.bottom + 4 >= this.game.world.height) {
			if (!this.alive) return;
			this.kill();
		}
	}),
	((FaceGame = FaceGame || {}).BreadMaker = function (t, e, s, i, a, h, o, r, l, n, m) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.player = m),
			(this.game = t),
			(this.tilemap = n),
			this.anchor.setTo(0.5),
			this.scale.setTo(0.95),
			a && (a *= 0.15),
			(this.customParams = {
				abovePlayer: !0,
				onTheGround: !1,
				originalY: this.y,
				needToRise: !1,
				needToFall: !1,
				delayTime: a || 0,
				makeBread: h || !1,
				delayUnlock: !1,
				smallStem: r,
				xlStem: l
			}),
			this.customParams.makeBread && (this.loafs = o),
			this.distanceFromPlayer,
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			(this.body.immovable = !0),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.autoCull = !0);
	}),
	(FaceGame.BreadMaker.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.BreadMaker.prototype.constructor = FaceGame.BreadMaker),
	(FaceGame.BreadMaker.prototype.update = function () {
		this.customParams.delayUnlock ||
			(this.customParams.delayTime--,
			this.customParams.delayTime <= 0 && ((this.customParams.delayUnlock = !0), this.press())),
			this.player.bottom >= this.bottom
				? (this.customParams.abovePlayer = !0)
				: this.player.bottom < this.bottom && (this.customParams.abovePlayer = !1),
			this.y <= this.customParams.originalY &&
				this.customParams.needToRise &&
				((this.customParams.needToRise = !1),
				(this.customParams.onTheGround = !1),
				(this.body.velocity.y = 0),
				this.game.time.events.add(
					1500,
					function () {
						this.press();
					},
					this
				)),
			this.customParams.needToRise && (this.body.velocity.y = -200),
			this.customParams.needToFall && (this.body.velocity.y = 600);
	}),
	(FaceGame.BreadMaker.prototype.press = function () {
		this.customParams.needToFall = !0;
	}),
	(FaceGame.BreadMaker.prototype.rise = function () {
		if (((this.customParams.needToRise = !0), this.customParams.makeBread)) {
			var t = this.loafs.getFirstExists(!1);
			t
				? (t.reset(this.x, this.y - 33), t.resetToNew())
				: ((t = new FaceGame.Loaf(this.game, this.x, this.y - 33)), this.loafs.add(t));
		}
	}),
	((FaceGame = FaceGame || {}).BreadMakerChild = function (t, e, s, i, a) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5, 1),
			this.scale.setTo(0.5),
			this.parentPress,
			this.game.physics.arcade.enableBody(this),
			(this.body.immovable = !0),
			(this.autoCull = !0);
	}),
	(FaceGame.BreadMakerChild.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.BreadMakerChild.prototype.constructor = FaceGame.BreadMakerChild),
	(FaceGame.BreadMakerChild.prototype.update = function () {
		this.y = this.parentPress.y;
	}),
	((FaceGame = FaceGame || {}).Bubble = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = h),
			this.anchor.setTo(0.5),
			(this.death2SFX = this.game.add.audio('death2')),
			(this.death2SFX.volume = 0.2),
			(this.pop1SFX = this.game.add.audio('pop1')),
			(this.pop1SFX.volume = 0.2),
			(this.pop2SFX = this.game.add.audio('pop2')),
			(this.pop2SFX.volume = 0.2),
			(this.pop3SFX = this.game.add.audio('pop3')),
			(this.pop3SFX.volume = 0.2),
			a || (a = (40 + 20 * Math.random()) * (Math.random() < 0.5 ? 1 : -1)),
			this.game.physics.arcade.enableBody(this),
			(this.body.velocity.x = a),
			this.scale.setTo(0.5),
			(this.health = 1),
			(this.body.allowGravity = !1),
			(this.customParams = { originalX: this.x, originalY: this.y, moveEight: this.x }),
			(this.body.checkCollision.down = !1),
			(this.body.checkCollision.left = !1),
			(this.body.checkCollision.right = !1);
	}),
	(FaceGame.Bubble.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Bubble.prototype.constructor = FaceGame.Enemy),
	(FaceGame.Bubble.prototype.update = function () {
		(this.position.x =
			40 * Math.cos(this.customParams.moveEight / 27) + this.customParams.originalX),
			this.customParams.moveEight++,
			this.y--,
			this.y < -25 && this.kill();
	}),
	(FaceGame.Bubble.prototype.damage = function (t, e, s) {
		if ((Phaser.Sprite.prototype.damage.call(this, t, e, s), this.health <= 0)) {
			var i = String(Math.round(1 + 2 * Math.random())),
				a = String('pop' + i + 'SFX');
			this[a].play(), this.kill();
		}
	}),
	((FaceGame = FaceGame || {}).BubbleBullet = function (t, e, s, i) {
		Phaser.Sprite.call(this, t, e, s, 'bubble'),
			(this.game = t),
			(this.player = i),
			this.anchor.setTo(0.5),
			(this.checkWorldBounds = !0),
			(this.outOfBoundsKill = !0),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x,
				timesCollided: 0,
				activatedSwitch: !1
			}),
			this.upOrDown;
	}),
	(FaceGame.BubbleBullet.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.BubbleBullet.prototype.constructor = FaceGame.BubbleBullet),
	(FaceGame.BubbleBullet.prototype.update = function () {
		this.upOrDown % 2 == 0
			? (this.y =
					20 * Math.cos((3 * this.customParams.moveEight) / 27) + this.customParams.originalY)
			: (this.y =
					-20 * Math.cos((3 * this.customParams.moveEight) / 27) + this.customParams.originalY),
			this.customParams.moveEight++,
			(this.x < this.game.camera.x - 100 ||
				this.x > this.game.camera.x + this.game.camera.width + 100) &&
				this.kill();
	}),
	((FaceGame = FaceGame || {}).Button = function (t, e, s, i, a, h, o, r, l, n, m, c) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = c),
			this.anchor.setTo(0.5, 1),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.gravity.y = 0.2 * -this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.immovable = !0),
			this.scale.setTo(0.8),
			(this.frame = 0),
			(this.buttonSqueakSFX = this.game.add.audio('buttonSqueakSFX')),
			(this.buttonSqueakSFX.volume = 0.3),
			(this.customParams = {
				groupToAffect: a,
				switchTie: h,
				secondGroupToAffect: o,
				playerOnTop: !1,
				playerOnTopTimer: 0,
				originalY: this.y,
				originalX: this.x,
				pressDistance: this.y + 10,
				pressed: !1,
				neutral: !0,
				oneTime: n || !1,
				moveNoMore: !1
			}),
			(this.resetIndiana = m),
			(this.customFunction = l),
			(this.autoCull = !0);
	}),
	(FaceGame.Button.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Button.prototype.constructor = FaceGame.Button),
	(FaceGame.Button.prototype.update = function () {
		this.customParams.playerOnTop &&
			(this.game.time.now > this.customParams.playerOnTopTimer &&
				(this.customParams.playerOnTop = !1),
			this.customParams.pressed || ((this.body.immovable = !1), (this.body.allowGravity = !1))),
			!this.customParams.neutral &&
				this.game.time.now > this.customParams.playerOnTopTimer + 30 &&
				!this.customParams.oneTime &&
				!this.customParams.moveNoMore &&
				(this.body.allowGravity = !0),
			this.y >= this.customParams.pressDistance && (this.customParams.pressed || this.pressed()),
			this.y <= this.customParams.originalY && (this.customParams.neutral || this.neutral()),
			this.customParams.neutral &&
				this.y > this.customParams.originalY &&
				(this.customParams.neutral = !1),
			this.x != this.customParams.originalX && (this.x = this.customParams.originalX),
			0 != this.body.velocity.x && (this.body.velocity.x = 0),
			this.customParams.pressed &&
				this.y < this.customParams.pressDistance &&
				((this.customParams.pressed = !1),
				this.customParams.groupToAffect &&
					FaceGame.GameState.switchChange(
						this.customParams.groupToAffect,
						this.customParams.switchTie,
						this,
						this.customParams.secondGroupToAffect
					));
	}),
	(FaceGame.Button.prototype.pressed = function () {
		(this.customParams.pressed = !0),
			(this.customParams.neutral = !1),
			(this.body.velocity.y = 0),
			(this.body.immovable = !0),
			(this.y = this.customParams.pressDistance),
			this.buttonSqueakSFX.play(),
			this.customParams.groupToAffect &&
				FaceGame.GameState.switchChange(
					this.customParams.groupToAffect,
					this.customParams.switchTie,
					this,
					this.customParams.secondGroupToAffect
				),
			this.customParams.oneTime && (this.customParams.moveNoMore = !0),
			this.customFunction && FaceGame.GameState[this.customFunction]();
	}),
	(FaceGame.Button.prototype.neutral = function () {
		(this.customParams.neutral = !0),
			(this.customParams.pressed = !1),
			(this.body.velocity.y = 0),
			(this.body.immovable = !0),
			(this.body.allowGravity = !1),
			(this.y = this.customParams.originalY);
	}),
	((FaceGame = FaceGame || {}).Buzzsaw = function (t, e, s, i, a, h, o, r, l, n, m, c) {
		Phaser.Sprite.call(this, t, e, s, 'buzzsaw'),
			(this.game = t),
			(this.tilemap = c),
			this.anchor.setTo(0.5),
			(this.x = Math.round(e)),
			(this.y = Math.round(s)),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			m &&
				(a || (a = 100),
				(r = 'true' == r || 'false' != r),
				o
					? (i || (i = 100),
					  'right' == o && (this.body.velocity.x = i),
					  'down' == o && (this.body.velocity.y = i),
					  'left' == o && (this.body.velocity.x = -i),
					  'up' == o && (this.body.velocity.y = -i))
					: (n || (n = Math.random() < 0.5 ? 1 : -1),
					  i || (i = 100 * n),
					  'up' == l ? (this.body.velocity.y = i * n) : (this.body.velocity.x = i * n))),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				distance: a,
				direction: l,
				moving: m,
				d2: h,
				d2move: o,
				clockwise: r,
				velocity: i
			}),
			this.body.setSize(75, 75),
			(this.anim = this.animations.add('saw', [0, 1, 2], 35, !0)),
			this.anim.play(),
			(this.autoCull = !0);
	}),
	(FaceGame.Buzzsaw.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Buzzsaw.prototype.constructor = FaceGame.Buzzsaw),
	(FaceGame.Buzzsaw.prototype.update = function () {
		'true' == this.customParams.moving &&
			(isNaN(parseFloat(this.customParams.d2))
				? 'up' == this.customParams.direction
					? this.body.velocity.y > 0 &&
					  this.y - this.customParams.distance > this.customParams.originalY
						? (this.body.velocity.y *= -1)
						: this.body.velocity.y < 0 &&
						  this.y + this.customParams.distance < this.customParams.originalY &&
						  (this.body.velocity.y *= -1)
					: this.body.velocity.x > 0 &&
					  this.x - this.customParams.distance > this.customParams.originalX
					? (this.body.velocity.x *= -1)
					: this.body.velocity.x < 0 &&
					  this.x + this.customParams.distance < this.customParams.originalX &&
					  (this.body.velocity.x *= -1)
				: ('left' == this.customParams.d2move &&
						this.x + this.customParams.d2 < this.customParams.originalX &&
						((this.customParams.originalX = this.x),
						(this.customParams.originalY = this.y),
						(this.body.velocity.x = 0),
						this.customParams.clockwise
							? ((this.body.velocity.y = -this.customParams.velocity),
							  (this.customParams.d2move = 'up'))
							: ((this.body.velocity.y = this.customParams.velocity),
							  (this.customParams.d2move = 'down'))),
				  'down' == this.customParams.d2move &&
						this.y - this.customParams.distance > this.customParams.originalY &&
						((this.customParams.originalX = this.x),
						(this.customParams.originalY = this.y),
						(this.body.velocity.y = 0),
						this.customParams.clockwise
							? ((this.body.velocity.x = -this.customParams.velocity),
							  (this.customParams.d2move = 'left'))
							: ((this.body.velocity.x = this.customParams.velocity),
							  (this.customParams.d2move = 'right'))),
				  'right' == this.customParams.d2move &&
						this.x - this.customParams.d2 > this.customParams.originalX &&
						((this.customParams.originalX = this.x),
						(this.customParams.originalY = this.y),
						(this.body.velocity.x = 0),
						this.customParams.clockwise
							? ((this.body.velocity.y = this.customParams.velocity),
							  (this.customParams.d2move = 'down'))
							: ((this.body.velocity.y = -this.customParams.velocity),
							  (this.customParams.d2move = 'up'))),
				  'up' == this.customParams.d2move &&
						this.y + this.customParams.distance < this.customParams.originalY &&
						((this.customParams.originalX = this.x),
						(this.customParams.originalY = this.y),
						(this.body.velocity.y = 0),
						this.customParams.clockwise
							? ((this.body.velocity.x = this.customParams.velocity),
							  (this.customParams.d2move = 'right'))
							: ((this.body.velocity.x = -this.customParams.velocity),
							  (this.customParams.d2move = 'left')))));
	}),
	((FaceGame = FaceGame || {}).ChainLift = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.player = o),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5, 0),
			(this.customParams = {
				originalY: this.y,
				distance: h || 200,
				destinationY: this.y - h,
				initialDirection: h > 0 ? 'down' : 'up',
				playerOnTop: !1,
				playerOnTopTimer: 0,
				startTimer: 0,
				movingUp: !1,
				movingDown: !1,
				atStart: !0,
				atTop: !1,
				timesActivated: 0
			}),
			this.game.physics.arcade.enableBody(this),
			(this.body.immovable = !0),
			(this.body.checkCollision.down = !1),
			(this.body.checkCollision.left = !1),
			(this.body.checkCollision.right = !1),
			(this.chainPullSFX = this.game.add.audio('chainPullSFX')),
			(this.chainPullSFX.volume = 1),
			(this.chainPullSFX.loop = !0);
	}),
	(FaceGame.ChainLift.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.ChainLift.prototype.constructor = FaceGame.ChainLift),
	(FaceGame.ChainLift.prototype.update = function () {
		this.game.time.now > this.customParams.playerOnTopTimer && (this.customParams.playerOnTop = !1),
			this.customParams.playerOnTop && this.customParams.startTimer++,
			this.customParams.playerOnTop ||
				0 == this.customParams.startTimer ||
				(this.customParams.startTimer = 0),
			this.customParams.startTimer >= 5 &&
				!this.customParams.movingDown &&
				!this.customParams.movingUp &&
				this.start(),
			this.customParams.movingUp &&
				(this.y >= this.customParams.originalY - this.customParams.distance
					? ((this.body.velocity.y = -140), this.chainPullSFX.isPlaying || this.chainPullSFX.play())
					: ((this.body.velocity.y = 0),
					  (this.customParams.movingDown = !1),
					  (this.customParams.movingUp = !1),
					  (this.customParams.atTop = !0),
					  this.chainPullSFX.isPlaying && this.chainPullSFX.stop())),
			!this.customParams.playerOnTop && this.customParams.atTop && (this.body.velocity.y = 140),
			!this.customParams.playerOnTop && this.customParams.movingUp && (this.body.velocity.y = 140),
			!this.customParams.playerOnTop &&
				(this.customParams.atTop || this.customParams.movingUp) &&
				this.y >= this.customParams.originalY &&
				((this.body.velocity.y = 0),
				(this.customParams.atStart = !0),
				(this.customParams.movingUp = !1),
				(this.customParams.atTop = !1),
				this.chainPullSFX.isPlaying && this.chainPullSFX.stop()),
			(this.body.velocity.y > 0 || this.body.velocity.y < 0) &&
				((this.children[0].scale.y = (this.y - this.customParams.destinationY) / 200),
				(this.children[1].scale.y = (this.y - this.customParams.destinationY) / 200),
				this.chainPullSFX.isPlaying || this.chainPullSFX.play());
	}),
	(FaceGame.ChainLift.prototype.start = function () {
		(this.customParams.movingUp = !0), (this.customParams.atStart = !1);
	}),
	((FaceGame = FaceGame || {}).Checkpoint = function (t, e, s, i, a, h, o, r) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.player = o),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.activateDirection = h || 'right'),
			this.scale.setTo(1),
			this.game.physics.arcade.enableBody(this),
			(this.body.immovable = !0),
			(this.body.allowGravity = !1),
			(this.checkpoint_reached = !1),
			(this.checkpointLabelFade = !1),
			(this.checkpointBellSFX = this.game.add.audio('checkpointBellSFX')),
			(this.checkpointBellSFX.volume = 0.5),
			(this.resetIndiana = r);
	}),
	(FaceGame.Checkpoint.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Checkpoint.prototype.constructor = FaceGame.Checkpoint),
	(FaceGame.Checkpoint.prototype.update = function () {
		var t = this.y - this.player.y,
			e = this.x - this.player.x;
		'left' == this.activateDirection &&
			this.player.x < this.x &&
			this.player.x > this.x - 200 &&
			Math.abs(t) < 200 &&
			!this.checkpoint_reached &&
			this.reach_checkpoint(),
			'right' == this.activateDirection &&
				this.player.x > this.x &&
				this.player.x < this.x + 200 &&
				Math.abs(t) < 200 &&
				!this.checkpoint_reached &&
				this.reach_checkpoint(),
			'down' == this.activateDirection &&
				this.player.y > this.y &&
				Math.abs(e) < 200 &&
				!this.checkpoint_reached &&
				this.reach_checkpoint(),
			'up' == this.activateDirection &&
				this.player.y < this.y &&
				Math.abs(e) < 200 &&
				!this.checkpoint_reached &&
				this.reach_checkpoint(),
			this.checkpoint_reached &&
				this.checkpointLabel.alpha > 0 &&
				this.checkpointLabelFade &&
				(this.checkpointLabel.alpha = this.checkpointLabel.alpha - 0.01),
			this.checkpoint_reached &&
				this.checkpointLabel.alpha <= 0 &&
				this.checkpointLabel.destroy(!0);
	}),
	(FaceGame.Checkpoint.prototype.reach_checkpoint = function () {
		(this.checkpoint_reached = !0),
			this.game.state.callbackContext.checkMsgTst(),
			(this.checkpointLabel = this.game.add.text(
				this.game.camera.width - 30,
				this.game.camera.height - 30,
				'checkpoint...',
				{ font: '17px Geo', fill: '#fff' }
			)),
			(this.checkpointLabel.fixedToCamera = !0),
			this.checkpointLabel.anchor.setTo(1, 0),
			(this.checkpointLabel.stroke = '#000000'),
			(this.checkpointLabel.strokeThickness = 2),
			this.checkpointBellSFX.play(),
			this.game.time.events.add(
				600,
				function () {
					this.checkpointLabelFade = !0;
				},
				this
			);
	}),
	((FaceGame = FaceGame || {}).ClamPearl = function (t, e, s, i) {
		Phaser.Sprite.call(this, t, e, s, 'pearl'),
			(this.game = t),
			this.game.physics.arcade.enableBody(this),
			this.anchor.setTo(0.5),
			(this.body.gravity.y = i),
			this.body.bounce.set(0.5, 0.8),
			(this.bounceCount = 0),
			(this.tinkSFX = this.game.add.audio('tinkSFX')),
			(this.tinkSFX.volume = 0.2),
			(this.pearlCrackSFX = this.game.add.audio('pearlCrackSFX')),
			(this.pearlCrackSFX.volume = 0.2);
	}),
	(FaceGame.ClamPearl.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.ClamPearl.prototype.constructor = FaceGame.ClamPearl),
	(FaceGame.ClamPearl.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0 &&
				(this.pearlCrackSFX.play(),
				(this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				this.enemyEmitter.makeParticles('pearlEmit'),
				this.game.physics.arcade.enable(this.enemyEmitter),
				(this.enemyEmitter.minParticleScale = 0.5),
				(this.enemyEmitter.maxParticleScale = 0.5),
				(this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				'jump' == e
					? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
					: 'shoot' == e &&
					  ('right' == s
							? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
							: 'left' == s &&
							  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-100, 100))),
				this.enemyEmitter.start(!0, 1e3, null, 8),
				this.kill());
	}),
	((FaceGame = FaceGame || {}).Conveyer = function (t, e, s, i, a, h, o, r, l) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = l),
			this.anchor.setTo(0.5),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			a || (a = 2),
			(this.animSpeed = 7 * a),
			h || (h = 'left'),
			'right' == h && ((this.angle = 180), this.scale.setTo(1, -1), (a *= -1)),
			o || (o = 1),
			(this.customParams = {
				pushSpeed: a,
				on: o,
				anim: this.animations.add('conveyer_move', [], this.animSpeed, !0),
				switchTie: r
			}),
			this.customParams.on > 0 && this.customParams.anim.play('conveyer_move'),
			(this.autoCull = !0);
	}),
	(FaceGame.Conveyer.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Conveyer.prototype.constructor = FaceGame.Conveyer),
	(FaceGame.Conveyer.prototype.update = function () {}),
	((FaceGame = FaceGame || {}).Crate = function (t, e, s, i, a, h, o, r, l, n, m) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = m),
			(this.layer = l),
			(this.player = h),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.health = 3),
			o || (o = 1),
			(this.size = o),
			this.scale.setTo(this.size),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				canActivateSwitch: !0,
				beingTouched: !1,
				lastTouched: 0,
				metal: !!r
			}),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			(this.body.velocity.x = 0),
			(this.body.velocity.y = 0),
			(this.body.allowGravity = !0),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.death3SFX = this.game.add.audio('death3')),
			(this.death3SFX.volume = 0.2),
			(this.break = r ? this.game.add.audio('crateBreakMetal') : this.game.add.audio('crateBreak')),
			(this.break.volume = 0.2),
			this.distanceFromPlayer,
			(this.resetIndiana = n),
			(this.crateTween = this.game.add.tween(this)),
			this.crateTween
				.to({ x: this.x + 2 }, 10)
				.to({ x: this.x - 2 }, 20)
				.to({ x: this.x }, 10),
			(this.autoCull = !0);
	}),
	(FaceGame.Crate.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Crate.prototype.constructor = FaceGame.Crate),
	(FaceGame.Crate.prototype.update = function () {
		this.game.time.now > this.game.state.callbackContext.timeCheck3 &&
			!this.customParams.canActivateSwitch &&
			(this.customParams.canActivateSwitch = !0),
			this.game.time.now > this.customParams.lastTouched && (this.customParams.beingTouched = !1),
			this.player.customParams.touchingCrate && this.customParams.beingTouched
				? (this.body.velocity.x > 80 && (this.body.velocity.x = 80),
				  this.body.velocity.x < -80 && (this.body.velocity.x = -80))
				: (this.body.velocity.x > 0 && (this.body.velocity.x -= 8),
				  this.body.velocity.x < 0 && (this.body.velocity.x += 8),
				  Math.abs(this.body.velocity.x) < 8 && (this.body.velocity.x = 0));
	}),
	(FaceGame.Crate.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.break.play(),
				  (this.crateEmitter = this.game.add.emitter(this.x, this.y, 5)),
				  this.customParams.metal
						? this.crateEmitter.makeParticles('plankMetal')
						: this.crateEmitter.makeParticles('plank'),
				  this.game.physics.arcade.enable(this.crateEmitter),
				  (this.crateEmitter.minParticleScale = 0.5),
				  (this.crateEmitter.maxParticleScale = 0.5),
				  (this.crateEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.crateEmitter.setYSpeed(-250, 250), this.crateEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.crateEmitter.setXSpeed(100, 200), this.crateEmitter.setYSpeed(-100, 200))
								: 'left' == s &&
								  (this.crateEmitter.setXSpeed(-100, -200),
								  this.crateEmitter.setYSpeed(-100, 100))),
				  this.crateEmitter.start(!0, 1e3, null, 8),
				  this.kill())
				: this.break.play();
	}),
	((FaceGame = FaceGame || {}).Donut = function (t, e, s, i, a) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.x = Math.round(e)),
			(this.y = Math.round(s));
		var h = 1 + 359 * Math.random();
		this.game.physics.arcade.enableBody(this),
			(this.body.checkCollision.up = !1),
			(this.body.allowGravity = !1),
			this.scale.setTo(0.25),
			(this.angle = h),
			(this.autoCull = !0);
	}),
	(FaceGame.Donut.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Donut.prototype.constructor = FaceGame.Donut),
	(FaceGame.Donut.prototype.update = function () {
		this.angle++, this.angle >= 360 && (this.angle = 0);
	}),
	((FaceGame = FaceGame || {}).Door = function (t, e, s, i, a, h, o, r, l, n, m, c) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.player = c),
			(this.game = t),
			(this.tilemap = m),
			this.anchor.setTo(0.5),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			void 0 == a && (a = 0),
			void 0 == r && (r = !1),
			void 0 == o && (o = !1),
			(this.customParams = {
				open: a,
				originalOpen: a,
				originalY: this.y,
				originalX: this.x,
				switchTie: h,
				sideways: o,
				auto: r,
				fishstick: l || !1,
				autoOpen: !1,
				autoClose: !1
			}),
			1 != a || o ? 1 == a && o && (this.x = this.x - this.width) : (this.y = this.y - this.height),
			(this.resetIndiana = n),
			(this.health = 3),
			(this.autoDoorOpenSFX = this.game.add.audio('autoDoorOpenSFX')),
			(this.autoDoorOpenSFX.volume = 1),
			(this.door2SFX = this.game.add.audio('door2SFX')),
			(this.door2SFX.volume = 1),
			(this.doorBreakSFX = this.game.add.audio('crateBreakMetal')),
			(this.doorBreakSFX.volume = 0.2),
			(this.autoCull = !0);
	}),
	(FaceGame.Door.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Door.prototype.constructor = FaceGame.Door),
	(FaceGame.Door.prototype.update = function () {
		if (this.customParams.auto) {
			var t = this.customParams.originalX - this.game.state.callbackContext.player.x,
				e = this.customParams.originalY - this.game.state.callbackContext.player.y;
			Math.abs(t) < 100 && Math.abs(e) < 220
				? (this.customParams.open = 1)
				: (this.customParams.open = 0);
		}
		this.customParams.sideways
			? (0 == this.customParams.open &&
					this.x >= this.customParams.originalX &&
					!this.customParams.auto &&
					(this.x--,
					!this.door2SFX.isPlaying &&
						this.x > this.game.camera.x &&
						this.x < this.game.camera.x + this.game.camera.width &&
						this.y > this.game.camera.y &&
						this.y < this.game.camera.y + this.game.camera.height &&
						this.door2SFX.play()),
			  1 == this.customParams.open &&
					this.x <= this.customParams.originalX + this.width &&
					!this.customParams.auto &&
					(this.x++,
					!this.door2SFX.isPlaying &&
						this.x > this.game.camera.x &&
						this.x < this.game.camera.x + this.game.camera.width &&
						this.y > this.game.camera.y &&
						this.y < this.game.camera.y + this.game.camera.height &&
						this.door2SFX.play()))
			: (0 == this.customParams.open &&
					this.y <= this.customParams.originalY &&
					(this.customParams.auto
						? ((this.y = this.y + 10),
						  !this.autoDoorOpenSFX.isPlaying &&
								this.x > this.game.camera.x &&
								this.x < this.game.camera.x + this.game.camera.width &&
								this.y > this.game.camera.y &&
								this.y < this.game.camera.y + this.game.camera.height &&
								this.autoDoorOpenSFX.play())
						: (this.y++,
						  !this.door2SFX.isPlaying &&
								this.x > this.game.camera.x &&
								this.x < this.game.camera.x + this.game.camera.width &&
								this.y > this.game.camera.y &&
								this.y < this.game.camera.y + this.game.camera.height &&
								this.door2SFX.play())),
			  1 == this.customParams.open &&
					this.y >= this.customParams.originalY - this.height &&
					(this.customParams.auto
						? ((this.y = this.y - 10),
						  !this.autoDoorOpenSFX.isPlaying &&
								this.x > this.game.camera.x &&
								this.x < this.game.camera.x + this.game.camera.width &&
								this.y > this.game.camera.y &&
								this.y < this.game.camera.y + this.game.camera.height &&
								this.autoDoorOpenSFX.play())
						: (this.y--,
						  !this.door2SFX.isPlaying &&
								this.x > this.game.camera.x &&
								this.x < this.game.camera.x + this.game.camera.width &&
								this.y > this.game.camera.y &&
								this.y < this.game.camera.y + this.game.camera.height &&
								this.door2SFX.play())));
	}),
	(FaceGame.Door.prototype.autoOpen = function () {}),
	(FaceGame.Door.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.doorBreakSFX.play(),
				  (this.doorEmitter = this.game.add.emitter(this.x, this.y, 5)),
				  this.doorEmitter.makeParticles('doorEmit'),
				  this.game.physics.arcade.enable(this.doorEmitter),
				  (this.doorEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.doorEmitter.setYSpeed(-250, 250), this.doorEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.doorEmitter.setXSpeed(100, 200), this.doorEmitter.setYSpeed(-100, 200))
								: 'left' == s &&
								  (this.doorEmitter.setXSpeed(-100, -200), this.doorEmitter.setYSpeed(-100, 100))),
				  this.doorEmitter.start(!0, 1e3, null, 8),
				  this.kill())
				: this.doorBreakSFX.play();
	}),
	((FaceGame = FaceGame || {}).DustBullet = function (t, e, s) {
		Phaser.Sprite.call(this, t, e, s, 'dust_bullet'),
			(this.game = t),
			this.game.physics.arcade.enableBody(this),
			this.anchor.setTo(0.5),
			(this.anim = this.animations.add('dust_bullet', [0, 1], 15, !0)),
			this.anim.play();
	}),
	(FaceGame.DustBullet.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.DustBullet.prototype.constructor = FaceGame.DustBullet),
	(FaceGame.DustBullet.prototype.update = function () {
		(this.x < this.game.camera.x - 100 ||
			this.x > this.game.camera.x + this.game.camera.width + 100) &&
			this.kill();
	}),
	((FaceGame = FaceGame || {}).Elevator = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.player = o),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			'levelR' == t.state.callbackContext.currentLevel ||
			'levelAA' == t.state.callbackContext.currentLevel
				? this.scale.setTo(1)
				: this.scale.setTo(0.75),
			(this.customParams = {
				originalY: this.y,
				distance: h || 200,
				destinationY: this.y + h,
				initialDirection: h > 0 ? 'down' : 'up',
				playerOnTop: !1,
				playerOnTopTimer: 0,
				startTimer: 0,
				movingUp: !1,
				movingDown: !1,
				timesActivated: 0
			}),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			(this.body.immovable = !0),
			(this.elevatorSFX = this.game.add.audio('elevatorSFX')),
			(this.elevatorSFX.volume = 0.7),
			(this.elevatorSFX.loop = !0),
			(this.boomSFX = this.game.add.audio('indianaBoomSFX')),
			(this.autoCull = !0);
	}),
	(FaceGame.Elevator.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Elevator.prototype.constructor = FaceGame.Elevator),
	(FaceGame.Elevator.prototype.update = function () {
		this.game.time.now > this.customParams.playerOnTopTimer && (this.customParams.playerOnTop = !1),
			this.customParams.playerOnTop
				? 'levelAA' != this.game.state.callbackContext.currentLevel &&
				  this.customParams.startTimer++
				: (this.customParams.startTimer = 0),
			30 != this.customParams.startTimer ||
				this.customParams.movingDown ||
				this.customParams.movingUp ||
				this.start(),
			this.customParams.movingDown &&
				('down' == this.customParams.initialDirection &&
				this.y <= this.customParams.originalY + this.customParams.distance
					? (this.body.velocity.y = 140)
					: 'up' == this.customParams.initialDirection && this.y <= this.customParams.originalY
					? (this.body.velocity.y = 140)
					: ((this.body.velocity.y = 0),
					  (this.customParams.movingDown = !1),
					  (this.customParams.movingUp = !1))),
			this.customParams.movingUp &&
				('up' == this.customParams.initialDirection &&
				this.y >= this.customParams.originalY + this.customParams.distance
					? (this.body.velocity.y = -140)
					: 'down' == this.customParams.initialDirection && this.customParams.originalY <= this.y
					? (this.body.velocity.y = -140)
					: ((this.body.velocity.y = 0),
					  (this.customParams.movingDown = !1),
					  (this.customParams.movingUp = !1),
					  ('levelR' != this.game.state.callbackContext.currentLevel &&
							'levelAA' != this.game.state.callbackContext.currentLevel) ||
							((this.y = 2340), this.elevatorSFX.stop(), this.boomSFX.play())));
	}),
	(FaceGame.Elevator.prototype.start = function () {
		this.customParams.timesActivated++,
			this.elevatorSFX.play(),
			(('down' == this.customParams.initialDirection &&
				this.customParams.timesActivated % 2 == 0) ||
				('up' == this.customParams.initialDirection &&
					this.customParams.timesActivated % 2 == 1)) &&
				(this.customParams.movingUp = !0),
			(('up' == this.customParams.initialDirection && this.customParams.timesActivated % 2 == 0) ||
				('down' == this.customParams.initialDirection &&
					this.customParams.timesActivated % 2 == 1)) &&
				(this.customParams.movingDown = !0);
	}),
	((FaceGame = FaceGame || {}).Enemy = function (t, e, s, i, a, h, o, r, l, n) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = n),
			(this.player = l),
			(this.game = t),
			(this.tilemap = h),
			this.anchor.setTo(0.5),
			(this.death2SFX = this.game.add.audio('death2')),
			(this.death2SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.squeak1SFX = this.game.add.audio('squeak1SFX')),
			(this.squeak2SFX = this.game.add.audio('squeak2SFX')),
			o || (o = !1),
			a || (a = (40 + 20 * Math.random()) * (Math.random() < 0.5 ? 1 : -1)),
			(this.velocityX = a),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			this.body.bounce.set(1, 0),
			(this.body.velocity.x = 0),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.health = 1),
			(this.body.immovable = !0),
			(this.customParams = { ignoreTheEdge: o, activated: !1 }),
			r && this.drunk(),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy.prototype.constructor = FaceGame.Enemy),
	(FaceGame.Enemy.prototype.update = function () {
		var t,
			e = this.x - this.player.x;
		this.y, this.player.y;
		if (
			(Math.abs(e) < 400 &&
				!this.customParams.activated &&
				((this.body.velocity.x = this.velocityX), (this.customParams.activated = !0)),
			this.customParams.ignoreTheEdge,
			this.body.velocity.x > 0
				? (this.scale.setTo(-1, 1), (t = 1))
				: (this.scale.setTo(1, 1), (t = -1)),
			!this.customParams.ignoreTheEdge)
		) {
			var s = this.x + t * (Math.abs(this.width) / 2 + 1),
				i = this.bottom + 1;
			!this.tilemap.getTileWorldXY(
				s,
				i,
				this.tilemap.tileWidth,
				this.tilemap.tileHeight,
				'collisionLayer'
			) &&
				this.body.blocked.down &&
				(this.body.velocity.x *= -1);
		}
	}),
	(FaceGame.Enemy.prototype.drunk = function () {
		var t = (20 + 40 * Math.random()) * (Math.random() < 0.5 ? 1 : -1);
		(this.velocityX = t), (this.body.velocity.x = t);
		var e = 800 + 1e3 * Math.random();
		this.game.time.events.add(
			e,
			function () {
				this.alive && this.drunk();
			},
			this
		);
	}),
	(FaceGame.Enemy.prototype.tweenTint = function (t, e, s, i) {
		var a = { step: 0 },
			h = this.game.add.tween(a).to({ step: 100 }, i);
		h.onUpdateCallback(function () {
			t.tint = Phaser.Color.interpolateColor(e, s, 100, a.step);
		}),
			(t.tint = e),
			h.start();
	}),
	(FaceGame.Enemy.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			this.health <= 0
				? (this.death2SFX.play(),
				  this.squeak1SFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 8)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-50, 50))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-50, 50))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16777215),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.squeak2SFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy10 = function (t, e, s, i, a, h, o, r) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = r),
			(this.player = h),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.health = 7),
			this.game.physics.arcade.enableBody(this),
			(this.customParams = {
				shootCounter: 0,
				hopCount: 0,
				hopDirection: 0,
				prepareGravFlip: !1,
				onCeiling: !1,
				inAir: !1
			}),
			(this.body.gravity.y = 1.3 * this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.collideWorldBounds = !0),
			(this.body.allowGravity = !0),
			(this.death3SFX = this.game.add.audio('death3')),
			(this.death3SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.anim = this.animations.add('bug', [], 3, !0)),
			this.anim.play(),
			(this.gunbugBullets = o),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy10.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy10.prototype.constructor = FaceGame.Enemy10),
	(FaceGame.Enemy10.prototype.update = function () {
		var t = this.x - this.player.x,
			e = this.y - this.player.y;
		Math.abs(t) < 500 &&
			Math.abs(e) < 10 &&
			this.customParams.inAir &&
			this.customParams.shootCounter < 1 &&
			this.shoot(),
			this.customParams.onCeiling
				? (this.player.x <= this.x && 1 == this.scale.x && this.scale.setTo(-1, -1),
				  this.player.x >= this.x && -1 == this.scale.x && this.scale.setTo(1, -1),
				  this.body.blocked.up && 3 != this.customParams.hopCount && this.alive && this.hop(),
				  this.body.blocked.up &&
						3 == this.customParams.hopCount &&
						((this.body.velocity.x = 0),
						this.customParams.prepareGravFlip ||
							((this.customParams.prepareGravFlip = !0), this.prepareGravFlip(t, e))))
				: (this.player.x <= this.x ? this.scale.setTo(-1, 1) : this.scale.setTo(1, 1),
				  this.body.blocked.down && 3 != this.customParams.hopCount && this.alive && this.hop(),
				  this.body.blocked.down &&
						3 == this.customParams.hopCount &&
						((this.body.velocity.x = 0),
						this.customParams.prepareGravFlip ||
							((this.customParams.prepareGravFlip = !0), this.prepareGravFlip(t, e))));
	}),
	(FaceGame.Enemy10.prototype.hop = function () {
		this.customParams.hopCount++,
			this.customParams.inAir &&
				((this.customParams.inAir = !1), (this.customParams.shootCounter = 0)),
			this.customParams.hopCount < 3 &&
				((this.customParams.hopDirection = 0 == this.customParams.hopDirection ? 1 : 0),
				this.customParams.onCeiling ? (this.body.velocity.y = 200) : (this.body.velocity.y = -200),
				1 == this.customParams.hopDirection
					? (this.body.velocity.x = -30)
					: (this.body.velocity.x = 30));
	}),
	(FaceGame.Enemy10.prototype.prepareGravFlip = function (t, e) {
		this.game.time.events.add(
			500,
			function () {
				this.alive &&
					((this.customParams.hopCount = -1),
					(this.customParams.prepareGravFlip = !1),
					(this.body.gravity.y = -1 * this.body.gravity.y),
					this.customParams.onCeiling
						? (this.customParams.onCeiling = !1)
						: (this.customParams.onCeiling = !0),
					(this.customParams.inAir = !0));
			},
			this
		);
	}),
	(FaceGame.Enemy10.prototype.shoot = function () {
		if (this.alive) {
			this.customParams.shootCounter++;
			var t = this.gunbugBullets.getFirstExists(!1);
			Math.random();
			t
				? t.reset(this.x + 0.2 * this.width, this.y - 0.5 * this.height)
				: ((t = new FaceGame.GunbugBullet(
						this.game,
						this.x + 0.2 * this.width,
						this.y - 0.5 * this.height
				  )),
				  this.gunbugBullets.add(t)),
				(t.body.velocity.x = 220 * this.scale.x);
		}
	}),
	(FaceGame.Enemy10.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.death3SFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350),
								  this.enemyEmitter.setYSpeed(-100, 100))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.urg.play());
	}),
	((FaceGame = FaceGame || {}).Enemy11 = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = o),
			(this.player = h),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.health = 3),
			this.game.physics.arcade.enableBody(this),
			(this.customParams = {
				shootCounter: 0,
				hopCount: 0,
				hopDirection: 0,
				prepareGravFlip: !1,
				onCeiling: !1,
				inAir: !1,
				deflectedTimer: 0
			}),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.allowGravity = !0),
			(this.death3SFX = this.game.add.audio('death3')),
			(this.death3SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.bakerDeflectSFX = this.game.add.audio('bakerDeflectSFX')),
			(this.bakerDeflectSFX.volume = 0.2),
			(this.baker1SFX = this.game.add.audio('baker1SFX')),
			(this.baker1SFX.volume = 0.8),
			(this.baker2SFX = this.game.add.audio('baker2SFX')),
			(this.baker2SFX.volume = 0.8),
			(this.anim = this.animations.add('baker', [0, 1], 2.5, !0)),
			this.anim.play(),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy11.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy11.prototype.constructor = FaceGame.Enemy11),
	(FaceGame.Enemy11.prototype.update = function () {
		var t = this.x - this.player.x;
		this.y, this.player.y;
		this.player.x <= this.x && 1 == this.scale.x && this.scale.setTo(-1, 1),
			this.player.x >= this.x && -1 == this.scale.x && this.scale.setTo(1, 1),
			Math.abs(t) < 500 &&
				!this.player.customParams.disBoiDed &&
				0 != this.player.body.velocity.y &&
				Math.abs(this.player.body.velocity.y) < 420 &&
				(this.body.velocity.y = this.player.body.velocity.y),
			this.customParams.deflectedTimer > 0 &&
				!this.anim.isPlaying &&
				(this.customParams.deflectedTimer--,
				this.customParams.deflectedTimer <= 0 && this.anim.play());
	}),
	(FaceGame.Enemy11.prototype.flipVelocityX = function () {
		Math.abs(this.body.velocity.x) < 30 && (this.body.velocity.x = 30),
			(this.body.velocity.x *= -1),
			this.game.time.events.add(
				650,
				function () {
					this.alive && this.flipVelocityX();
				},
				this
			);
	}),
	(FaceGame.Enemy11.prototype.deflect = function () {
		this.anim.stop(),
			(this.frame = 2),
			(this.customParams.deflectedTimer = 15),
			this.bakerDeflectSFX.isPlaying || this.bakerDeflectSFX.play();
	}),
	(FaceGame.Enemy11.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.baker2SFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350),
								  this.enemyEmitter.setYSpeed(-100, 100))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.kill())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.baker1SFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy12 = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = o),
			(this.player = h),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.health = 6),
			this.game.physics.arcade.enableBody(this),
			(this.customParams = { shootCounter: 0 }),
			(this.direction = 1),
			(this.body.velocity.x = 0),
			(this.body.velocity.y = 0),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.collideWorldBounds = !0),
			(this.body.allowGravity = !0),
			(this.anim = this.animations.add('clam_move', [0, 1], 3, !0)),
			(this.slowAnim = this.animations.add('clam_move2', [1, 0], 0.6, !0)),
			(this.death3SFX = this.game.add.audio('death3')),
			(this.death3SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.fatMan1SFX = this.game.add.audio('fatMan2SFX')),
			(this.fatMan1SFX.volume = 0.2),
			(this.fatMan2SFX = this.game.add.audio('fatMan4SFX')),
			(this.fatMan2SFX.volume = 0.2),
			(this.fatMan3SFX = this.game.add.audio('fatMan1SFX')),
			(this.fatMan3SFX.volume = 0.2),
			(this.fatMan4SFX = this.game.add.audio('fatMan3SFX')),
			(this.fatMan4SFX.volume = 0.2),
			this.anim.play(),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy12.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy12.prototype.constructor = FaceGame.Enemy12),
	(FaceGame.Enemy12.prototype.update = function () {
		this.player.x <= this.x &&
			-1 == this.scale.x &&
			(this.scale.setTo(1, 1), (this.direction = -1)),
			this.player.x >= this.x &&
				1 == this.scale.x &&
				(this.scale.setTo(-1, 1), (this.direction = 1)),
			this.anim.loopCount % 3 == 0 &&
				0 != this.anim.loopCount &&
				((this.anim.loopCount = 0),
				(this.customParams.shootCounter = 0),
				this.anim.stop(),
				this.slowAnim.play()),
			this.slowAnim.loopCount % 1 == 0 &&
				0 != this.slowAnim.loopCount &&
				((this.slowAnim.loopCount = 0), this.slowAnim.stop(), this.anim.play());
		var t = this.x - this.player.x;
		this.y, this.player.y;
		0 == this.slowAnim.frame &&
			Math.abs(t) < 2300 &&
			(0 == this.customParams.shootCounter && this.shoot(), this.customParams.shootCounter++);
	}),
	(FaceGame.Enemy12.prototype.shoot = function () {
		var t = FaceGame.GameState.bagels.getFirstExists(!1),
			e = 12 * Math.random() * this.direction,
			s = String(Math.round(1 + 2 * Math.random())),
			i = this.x - this.player.x > 0 ? -100 : 100;
		(t
			? (t.reset(this.x, this.y), (t.body.velocity.x = i), (t.spinSpeed = e))
			: ((t = new FaceGame.Bagel(this.game, this.x, this.y, e, i, 'cRoll' + s)),
			  FaceGame.GameState.bagels.add(t)),
		(this.frame = 2),
		this.x > this.game.camera.x &&
			this.x < this.game.camera.x + this.game.camera.width &&
			this.y > this.game.camera.y &&
			this.y < this.game.camera.y + this.game.camera.height) &&
			this['fatMan' + String(Math.round(1 + 1 * Math.random())) + 'SFX'].play();
		this.body.velocity.y = -100;
	}),
	(FaceGame.Enemy12.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			(this.frame = 3),
			this.health <= 0
				? (this.fatMan4SFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350),
								  this.enemyEmitter.setYSpeed(-100, 100))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.fatMan3SFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy13 = function (t, e, s, i, a, h, o, r) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = r),
			(this.player = h),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			this.scale.setTo(0.5),
			(this.health = 7),
			this.game.physics.arcade.enableBody(this),
			(this.customParams = { canShoot: !0, hopCount: 0, hopDirection: 0, inAir: !1, visible: !0 }),
			(this.body.gravity.y = 1.3 * this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.collideWorldBounds = !0),
			(this.body.allowGravity = !0),
			(this.dust1SFX = this.game.add.audio('dust1SFX')),
			(this.dust1SFX.volume = 0.8),
			(this.dust2SFX = this.game.add.audio('dust2SFX')),
			(this.dust2SFX.volume = 0.8),
			(this.poofOutSFX = this.game.add.audio('poofOutSFX')),
			(this.poofOutSFX.volume = 0.8),
			(this.poofInSFX = this.game.add.audio('poofInSFX')),
			(this.poofInSFX.volume = 0.8),
			(this.anim = this.animations.add('dust', [0, 4], 6, !1)),
			(this.blinkAnim = this.animations.add('dust_blink', [3, 5], 6, !1)),
			(this.poofOutAnim = this.animations.add('dust_poof_out', [6, 8], 5, !1)),
			(this.poofInAnim = this.animations.add('dust_poof_in', [9, 11], 6, !1)),
			this.anim.onComplete.add(function () {
				this.decideNextAnim();
			}, this),
			this.blinkAnim.onComplete.add(function () {
				this.decideNextAnim();
			}, this),
			this.poofOutAnim.onComplete.add(function () {
				this.alpha = 0;
			}, this),
			this.poofInAnim.onComplete.add(function () {
				(this.body.enable = !0),
					(this.body.gravity.y = 1.3 * this.game.state.callbackContext.GAME_GRAVITY),
					(this.customParams.visible = !0),
					this.anim.play(),
					(this.scale.x *= 0.5),
					(this.scale.y *= 0.5);
			}, this),
			this.anim.play(),
			(this.dustBullets = o),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy13.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy13.prototype.constructor = FaceGame.Enemy13),
	(FaceGame.Enemy13.prototype.update = function () {
		var t = this.x - this.player.x,
			e = this.y - this.player.y;
		this.customParams.visible
			? (Math.abs(t) < 100 &&
					Math.abs(e) < 100 &&
					(this.anim.isPlaying && this.anim.stop(),
					this.blinkAnim.isPlaying && this.blinkAnim.stop(),
					this.poofOut()),
			  Math.abs(t) < 500 &&
					Math.abs(e) < 10 &&
					this.customParams.canShoot &&
					0.5 == Math.abs(this.scale.x) &&
					this.shoot(),
			  this.player.x <= this.x &&
					this.customParams.visible &&
					(0.5 == this.scale.x || 1 == this.scale.x) &&
					this.scale.setTo(-0.5, 0.5),
			  this.player.x >= this.x &&
					this.customParams.visible &&
					(-0.5 == this.scale.x || -1 == this.scale.x) &&
					this.scale.setTo(0.5, 0.5),
			  (this.body.blocked.down || this.body.touching.down) && this.alive && this.hop())
			: (Math.abs(t) > 150 || Math.abs(e) > 150) &&
			  !this.poofInAnim.isPlaying &&
			  ((this.alpha = 1), this.poofIn());
	}),
	(FaceGame.Enemy13.prototype.hop = function () {
		this.customParams.hopCount++,
			this.customParams.inAir &&
				((this.customParams.inAir = !1), (this.customParams.shootCounter = 0)),
			(this.customParams.hopDirection = 0 == this.customParams.hopDirection ? 1 : 0),
			(this.body.velocity.y = -200),
			1 == this.customParams.hopDirection
				? (this.body.velocity.x = -30)
				: (this.body.velocity.x = 30);
	}),
	(FaceGame.Enemy13.prototype.shoot = function () {
		if (this.alive) {
			(this.customParams.canShoot = !1),
				this.game.time.events.add(
					3e3,
					function () {
						this.alive && (this.customParams.canShoot = !0);
					},
					this
				);
			var t = this.dustBullets.getFirstExists(!1);
			Math.random();
			t
				? t.reset(this.x + 0.2 * this.width, this.y - 0.5 * this.height)
				: ((t = new FaceGame.DustBullet(
						this.game,
						this.x + 0.2 * this.width,
						this.y - 0.5 * this.height
				  )),
				  this.dustBullets.add(t)),
				(t.body.velocity.x = 240 * this.scale.x);
		}
	}),
	(FaceGame.Enemy13.prototype.decideNextAnim = function () {
		Math.random() < 0.8 ? this.anim.play() : this.blinkAnim.play();
	}),
	(FaceGame.Enemy13.prototype.poofOut = function () {
		(this.customParams.visible = !1),
			(this.body.enable = !1),
			this.scale.setTo(1, 1),
			(this.body.velocity.x = 0),
			(this.body.velocity.y = 0),
			(this.body.gravity.y = 0),
			this.poofOutAnim.play(),
			this.poofOutSFX.play();
	}),
	(FaceGame.Enemy13.prototype.poofIn = function () {
		this.poofInAnim.play(), this.poofInSFX.play();
	}),
	(FaceGame.Enemy13.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.dust2SFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350),
								  this.enemyEmitter.setYSpeed(-100, 100))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.dust1SFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy14 = function (t, e, s, i, a, h, o, r, l, n, m, c) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = c),
			(this.player = m),
			(this.game = t),
			(this.tilemap = n),
			this.anchor.setTo(0.5),
			(this.death1SFX = this.game.add.audio('death1')),
			(this.death1SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.crabCrackSFX = this.game.add.audio('crabCrackSFX')),
			(this.crabCrackSFX.volume = 0.2),
			(this.crabHitSFX = this.game.add.audio('crabHitSFX')),
			(this.crabHitSFX.volume = 0.4),
			a || (a = 40 + 20 * Math.random()),
			h || (h = Math.random() < 0.5 ? 1 : -1),
			o || (o = 100 + 150 * Math.random()),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			this.body.bounce.set(1, 0),
			(this.body.velocity.x = a * h),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.immovable = !0),
			l || (l = 1),
			(this.health = l),
			(this.customParams = {
				activated: !1,
				originalX: this.x,
				originalY: this.y,
				distance: o,
				velocity: a,
				direction: h,
				crabStopped: !1
			}),
			r || (r = 0.8),
			(this.size = r),
			(this.scale.x = -this.size * h),
			(this.scale.y = this.size),
			(this.anim = this.animations.add('crab', [], 6, !0)),
			this.anim.play(),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy14.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy14.prototype.constructor = FaceGame.Enemy14),
	(FaceGame.Enemy14.prototype.update = function () {
		this.body.velocity.x > 0 && this.x - this.customParams.distance > this.customParams.originalX
			? this.customParams.crabStopped || this.stopThatCrab()
			: this.body.velocity.x < 0 &&
			  this.x + this.customParams.distance < this.customParams.originalX &&
			  (this.customParams.crabStopped || this.stopThatCrab());
	}),
	(FaceGame.Enemy14.prototype.stopThatCrab = function () {
		(this.customParams.crabStopped = !0),
			(this.body.velocity.x = 0),
			(this.customParams.direction *= -1),
			this.game.time.events.add(
				1200,
				function () {
					this.alive &&
						((this.scale.x *= -1),
						(this.customParams.crabStopped = !1),
						(this.body.velocity.x = this.customParams.velocity * this.customParams.direction));
				},
				this
			);
	}),
	(FaceGame.Enemy14.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			this.health <= 0
				? (this.crabCrackSFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 8)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-50, 50))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-50, 50))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.crabHitSFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy15 = function (t, e, s, i, a, h, o, r, l) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = l),
			(this.game = t),
			(this.tilemap = r),
			this.anchor.setTo(0.5),
			(this.death2SFX = this.game.add.audio('death2')),
			(this.death2SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.seagull1SFX = this.game.add.audio('seagull1SFX')),
			(this.seagull2SFX = this.game.add.audio('seagull2SFX'));
		var n = Math.random() < 0.5 ? 1 : -1;
		a || (a = 80 * n),
			h || (h = 200),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			this.body.bounce.set(1, 0),
			(this.body.velocity.x = a),
			(this.health = 2.5),
			(this.body.allowGravity = !1),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x,
				distance: h
			}),
			(this.gullDung = o),
			(this.anim = this.animations.add('gull', [], 8, !0)),
			this.anim.play(),
			this.shoot(),
			this.body.setSize(50, 25),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy15.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy15.prototype.constructor = FaceGame.Enemy15),
	(FaceGame.Enemy15.prototype.update = function () {
		this.body.velocity.x > 0 && this.x - this.customParams.distance > this.customParams.originalX
			? (this.body.velocity.x *= -1)
			: this.body.velocity.x < 0 &&
			  this.x + this.customParams.distance < this.customParams.originalX &&
			  (this.body.velocity.x *= -1),
			this.body.velocity.x > 0 ? this.scale.setTo(1, 1) : this.scale.setTo(-1, 1);
	}),
	(FaceGame.Enemy15.prototype.shoot = function () {
		if (this.x - 0.5 * this.width < 9270 || this.x - 0.5 * this.width > 9335) {
			var t = this.gullDung.getFirstExists(!1);
			Math.random();
			t
				? (t.reset(this.x - 0.5 * this.width, this.y), (t.body.velocity.y = 100))
				: ((t = new FaceGame.GullDung(this.game, this.x - 0.5 * this.width, this.y)),
				  this.gullDung.add(t));
		}
		var e = 1e3 + 1e3 * Math.random();
		this.game.time.events.add(
			e,
			function () {
				this.alive && this.shoot();
			},
			this
		);
	}),
	(FaceGame.Enemy15.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			this.health <= 0
				? (this.death2SFX.play(),
				  this.seagull2SFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 8)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-50, 50))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-50, 50))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.seagull1SFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy2 = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = o),
			(this.game = t),
			(this.tilemap = h),
			this.anchor.setTo(0.5),
			(this.death2SFX = this.game.add.audio('death2')),
			(this.death2SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.bat1SFX = this.game.add.audio('bat1SFX')),
			(this.bat2SFX = this.game.add.audio('bat2SFX')),
			a || (a = (40 + 20 * Math.random()) * (Math.random() < 0.5 ? 1 : -1)),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			this.body.bounce.set(1, 0),
			(this.body.velocity.x = a),
			this.scale.setTo(0.5),
			(this.health = 1),
			(this.body.allowGravity = !1),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x,
				anim: this.animations.add('bat_flap', [], 15, !0)
			}),
			this.customParams.anim.play(),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy2.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy2.prototype.constructor = FaceGame.Enemy2),
	(FaceGame.Enemy2.prototype.update = function () {
		(this.position.x =
			40 * Math.cos(this.customParams.moveEight / 27) + this.customParams.originalX),
			(this.position.y =
				40 * Math.sin((2 * this.customParams.moveEight) / 67) + this.customParams.originalY),
			this.customParams.moveEight++;
	}),
	(FaceGame.Enemy2.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			this.health <= 0
				? (this.death2SFX.play(),
				  this.bat1SFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 8)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-50, 50))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-50, 50))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.bat2SFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy3 = function (t, e, s, i, a, h, o, r, l, n) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = n),
			(this.player = o),
			(this.game = t),
			(this.tilemap = h),
			this.anchor.setTo(0.5),
			r || (r = 0.75),
			(this.size = r),
			this.scale.setTo(r),
			l || (l = 4),
			(this.health = l),
			(this.customParams = { anim: this.animations.add('spider_move', [], 3, !0) }),
			a || (a = (40 + 20 * Math.random()) * (Math.random() < 0.5 ? 1 : -1)),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			this.body.bounce.set(1, 0),
			this.body.setSize(132, 85),
			(this.death3SFX = this.game.add.audio('death3')),
			(this.death3SFX.volume = 0.2),
			(this.spiderDieSFX = this.game.add.audio('spiderDieSFX')),
			(this.spiderDieSFX.volume = 0.2),
			(this.spiderHurtSFX = this.game.add.audio('spiderHurtSFX')),
			(this.spiderHurtSFX.volume = 0.2),
			(this.enemyTimer = this.game.time.create(!1)),
			this.enemyTimer.start(),
			this.scheduleJump(),
			this.customParams.anim.play(),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy3.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy3.prototype.constructor = FaceGame.Enemy3),
	(FaceGame.Enemy3.prototype.update = function () {
		this.body.blocked.down
			? ((this.body.velocity.x = 0), (this.customParams.anim.speed = 3))
			: this.body.velocity.x > 0
			? (this.scale.setTo(this.size, this.size), (this.direction = 1))
			: (this.scale.setTo(-this.size, this.size), (this.direction = -1));
	}),
	(FaceGame.Enemy3.prototype.scheduleJump = function () {
		var t = this.x - this.player.x,
			e = this.y - this.player.y;
		Math.abs(t) < 500 && Math.abs(e) < 250 && this.jump();
		var s = 0.3 + 0.5 * Math.random();
		this.enemyTimer.add(Phaser.Timer.SECOND * s, this.scheduleJump, this);
	}),
	(FaceGame.Enemy3.prototype.jump = function () {
		if (this.alive) {
			this.customParams.anim.speed = 10;
			var t = 100 + 225 * Math.random(),
				e = 65 + 46 * Math.random();
			1 == this.direction && this.body.blocked.down
				? ((this.body.velocity.x = e), (this.body.velocity.y = -t))
				: -1 == this.direction &&
				  this.body.blocked.down &&
				  ((this.body.velocity.x = -e), (this.body.velocity.y = -t));
		}
	}),
	(FaceGame.Enemy3.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.spiderDieSFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 8)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-50, 50))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-50, 50))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  1.5 == this.size && this.game.state.callbackContext.spiderBabies(this.x, this.y),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.spiderHurtSFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy6 = function (t, e, s, i, a, h, o, r, l, n) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = n),
			(this.player = l),
			(this.game = t),
			(this.tilemap = h),
			this.anchor.setTo(0.5),
			(this.health = 1),
			this.game.physics.arcade.enableBody(this),
			(this.flop = !1),
			(this.float = !1),
			o && (this.flop = !0),
			r && (this.float = !0),
			(this.customParams = {
				waitCounter: 0,
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x
			}),
			(this.direction = 1),
			(this.body.velocity.x = 0),
			(this.body.velocity.y = 0),
			(this.friction = 2),
			(this.body.collideWorldBounds = !0),
			this.body.bounce.set(1, 1),
			this.flop
				? ((this.body.allowGravity = !0),
				  (this.body.gravity.y = 1.7 * this.game.state.callbackContext.GAME_GRAVITY),
				  this.scale.setTo(-1),
				  (this.anim = this.animations.add('fish_move', [2, 3], 2, !0)))
				: (this.float,
				  (this.body.allowGravity = !1),
				  (this.anim = this.animations.add('fish_move', [0, 1], 2, !0))),
			(this.death3SFX = this.game.add.audio('death3')),
			(this.death3SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.fish1SFX = this.game.add.audio('fish1SFX')),
			this.flop || this.float || this.swim(),
			this.anim.play();
	}),
	(FaceGame.Enemy6.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy6.prototype.constructor = FaceGame.Enemy6),
	(FaceGame.Enemy6.prototype.update = function () {
		if (this.flop) {
			if (this.body.touching.down || this.body.blocked.down) {
				var t = Math.random() < 0.5 ? 1 : -1,
					e = Math.random() < 0.5 ? 1 : -1;
				this.scale.setTo(t, e);
				var s = (20 + 10 * Math.random()) * (Math.random() < 0.5 ? 1 : -1);
				this.x - this.customParams.originalX <= -25 && s <= -1 && (s *= -1),
					this.x - this.customParams.originalX >= 25 && s >= 1 && (s *= -1),
					(this.body.velocity.x = s);
			}
		} else
			this.float
				? ((this.position.y =
						40 * Math.cos((2 * this.customParams.moveEight) / 67) + this.customParams.originalY),
				  this.customParams.moveEight++,
				  this.player.x <= this.x && -1 == this.scale.x && this.scale.setTo(1, 1),
				  this.player.x >= this.x && 1 == this.scale.x && this.scale.setTo(-1, 1))
				: (Math.abs(this.body.velocity.x) < this.friction && (this.body.velocity.x = 0),
				  this.body.velocity.x > 0
						? (this.body.velocity.x -= this.friction)
						: this.body.velocity.x < 0 && (this.body.velocity.x += this.friction),
				  this.body.velocity.x > 1 && (this.scale.setTo(-1, 1), (this.direction = 1)),
				  this.body.velocity.x < -1 && (this.scale.setTo(1, 1), (this.direction = -1)),
				  0 == this.body.velocity.x && this.customParams.waitCounter++,
				  this.customParams.waitCounter >= 100 && this.swim(),
				  Math.abs(this.body.velocity.x) > 80 ? (this.anim.speed = 10) : (this.anim.speed = 2));
		this.autoCull = !0;
	}),
	(FaceGame.Enemy6.prototype.swim = function () {
		(this.customParams.waitCounter = 0), (this.body.velocity.x = 240 * this.direction);
	}),
	(FaceGame.Enemy6.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.death3SFX.play(),
				  this.fish1SFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350),
								  this.enemyEmitter.setYSpeed(-100, 100))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.fish1SFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy7 = function (t, e, s, i, a, h, o, r, l) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = l),
			(this.player = h),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.health = 6),
			this.game.physics.arcade.enableBody(this),
			(this.gravityNum =
				1 == r
					? 0.5 * this.game.state.callbackContext.GAME_GRAVITY
					: this.game.state.callbackContext.GAME_GRAVITY),
			(this.customParams = { shootCounter: 0, underwater: r || !1 }),
			(this.direction = 1),
			(this.body.velocity.x = 0),
			(this.body.velocity.y = 0),
			(this.body.gravity.y = this.gravityNum),
			(this.body.collideWorldBounds = !0),
			(this.body.allowGravity = !0),
			(this.anim = this.animations.add('clam_move', [1, 2], 3, !0)),
			(this.slowAnim = this.animations.add('clam_move2', [1, 0], 0.6, !0)),
			(this.body.checkCollision.left = !1),
			(this.body.checkCollision.right = !1),
			(this.death3SFX = this.game.add.audio('death3')),
			(this.death3SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.clamHitSFX = this.game.add.audio('clamHitSFX')),
			(this.clamHitSFX.volume = 0.2),
			(this.clamCrackSFX = this.game.add.audio('clamCrackSFX')),
			(this.clamCrackSFX.volume = 0.2),
			this.anim.play(),
			(this.clamPearls = o),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy7.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy7.prototype.constructor = FaceGame.Enemy7),
	(FaceGame.Enemy7.prototype.update = function () {
		this.player.x <= this.x &&
			1 == this.scale.x &&
			(this.scale.setTo(-1, 1), (this.direction = -1)),
			this.player.x >= this.x &&
				-1 == this.scale.x &&
				(this.scale.setTo(1, 1), (this.direction = 1)),
			0 == this.frame
				? this.body.setSize(75, 59, 0, 0)
				: 1 == this.frame && this.body.setSize(75, 30, 0, 14.5),
			this.anim.loopCount % 3 == 0 &&
				0 != this.anim.loopCount &&
				((this.anim.loopCount = 0),
				(this.customParams.shootCounter = 0),
				this.anim.stop(),
				this.slowAnim.play()),
			this.slowAnim.loopCount % 1 == 0 &&
				0 != this.slowAnim.loopCount &&
				((this.slowAnim.loopCount = 0), this.slowAnim.stop(), this.anim.play());
		this.x, this.player.x, this.y, this.player.y;
		0 == this.slowAnim.frame &&
			this.x > this.game.camera.x &&
			this.x < this.game.camera.x + this.game.camera.width &&
			this.y > this.game.camera.y &&
			this.y < this.game.camera.y + this.game.camera.height &&
			(0 == this.customParams.shootCounter && this.shoot(), this.customParams.shootCounter++);
	}),
	(FaceGame.Enemy7.prototype.shoot = function () {
		var t = this.clamPearls.getFirstExists(!1);
		t
			? t.reset(this.x, this.y)
			: ((t = new FaceGame.ClamPearl(this.game, this.x, this.y, this.gravityNum)),
			  this.clamPearls.add(t)),
			(t.bounceCount = 0);
		var e = 100 + 200 * Math.random(),
			s = 200 * Math.random() - 300;
		(t.body.velocity.x = e * this.direction),
			(t.body.velocity.y = s),
			(this.body.velocity.y = -100);
	}),
	(FaceGame.Enemy7.prototype.tweenTint = function (t, e, s, i) {
		var a = { step: 0 },
			h = this.game.add.tween(a).to({ step: 100 }, i);
		h.onUpdateCallback(function () {
			t.tint = Phaser.Color.interpolateColor(e, s, 100, a.step);
		}),
			(t.tint = e),
			h.start();
	}),
	(FaceGame.Enemy7.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.clamCrackSFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				  this.enemyEmitter.makeParticles([
						'blood1',
						'blood2',
						'blood3',
						'blood4',
						'blood5',
						'blood6',
						'blood7',
						'blood8'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350),
								  this.enemyEmitter.setYSpeed(-100, 100))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.clamHitSFX.play());
	}),
	((FaceGame = FaceGame || {}).Enemy8 = function (t, e, s, i, a, h, o, r, l, n, m) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = m),
			(this.game = t),
			(this.player = r),
			(this.tilemap = l),
			this.anchor.setTo(0.5),
			(this.zEmit = n),
			(this.death2SFX = this.game.add.audio('death2')),
			(this.death2SFX.volume = 0.2),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2),
			(this.zombieSFX1 = this.game.add.audio('zombieSFX1')),
			(this.zombieSFX1.volume = 0.2),
			(this.zombieHit1SFX = this.game.add.audio('zombieHit1SFX')),
			(this.zombieHit1SFX.volume = 0.6),
			(this.zombieHit2SFX = this.game.add.audio('zombieHit2SFX')),
			(this.zombieHit2SFX.volume = 0.6),
			(this.zombieHit3SFX = this.game.add.audio('zombieHit3SFX')),
			(this.zombieHit3SFX.volume = 0.6),
			(this.zombieHit4SFX = this.game.add.audio('zombieHit4SFX')),
			(this.zombieHit4SFX.volume = 0.6),
			(this.zombieHit5SFX = this.game.add.audio('zombieHit5SFX')),
			(this.zombieHit5SFX.volume = 0.6),
			a
				? ((a = !0), (this.okNowYouCanMove = !1), (this.beenActivated = !1), (this.OGSurprise = !0))
				: ((a = !1),
				  (this.okNowYouCanMove = !0),
				  (this.beenActivated = !0),
				  (this.OGSurprise = !1)),
			(h = !!h),
			(this.surprise = a),
			(this.agro = h),
			(this.zTrap = !!o),
			o
				? ((this.alpha = 0), (this.zTrapTransition = !1), (this.zTrapDone = !1))
				: (this.game.physics.arcade.enableBody(this),
				  (this.body.collideWorldBounds = !0),
				  (this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY)),
			this.scale.setTo(0.5),
			(this.health = 7),
			(this.customParams = { shouldShortHop: !1, ShortHopDelayTimer: 0 }),
			this.agro
				? ((this.moveSpeed = 100), (this.frame = 1), (this.hopHeight = -225), (this.hopDelay = 50))
				: ((this.moveSpeed = 30), (this.frame = 0), (this.hopHeight = -175), (this.hopDelay = 75)),
			this.surprise
				? ((this.body.allowGravity = !1), (this.body.velocity.x = 0))
				: o || ((this.body.allowGravity = !0), (this.body.velocity.x = 0)),
			(this.convertedToAgro = !1),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy8.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy8.prototype.constructor = FaceGame.Enemy8),
	(FaceGame.Enemy8.prototype.update = function () {
		if (!this.zTrap) {
			var t = this.x - this.player.x;
			if (
				(Math.abs(t) < 400 &&
					!this.surprise &&
					this.okNowYouCanMove &&
					(this.player.x > this.x - 20 && this.player.x < this.x + 20
						? ((this.body.velocity.x = 0), (this.customParams.shouldShortHop = !0))
						: this.player.x >= this.x
						? (this.scale.setTo(0.5, 0.5),
						  (this.body.velocity.x = this.moveSpeed),
						  (this.customParams.shouldShortHop = !1))
						: (this.scale.setTo(-0.5, 0.5),
						  (this.body.velocity.x = -this.moveSpeed),
						  (this.customParams.shouldShortHop = !1)),
					this.customParams.shouldShortHop && this.shortHop(),
					this.customParams.ShortHopDelayTimer > 0 && this.customParams.ShortHopDelayTimer--),
				this.player.x >= this.x && -0.5 == this.scale.x && this.scale.setTo(0.5, 0.5),
				this.player.x <= this.x && 0.5 == this.scale.x && this.scale.setTo(-0.5, 0.5),
				Math.abs(t) < 200 && this.surprise && this.surpriseJump(),
				this.body.velocity.y <= 10 &&
					this.OGSurprise &&
					!this.beenActivated &&
					(this.beenActivated = !0),
				this.body.blocked.down &&
					this.OGSurprise &&
					this.beenActivated &&
					(this.okNowYouCanMove = !0),
				this.agro || this.convertedToAgro)
			) {
				var e;
				e = this.body.velocity.x > 0 ? 1 : -1;
				var s = this.x + e * (Math.abs(this.width) / 2 + 1),
					i = this.bottom + 1;
				!this.tilemap.getTileWorldXY(
					s,
					i,
					this.tilemap.tileWidth,
					this.tilemap.tileHeight,
					'collisionLayer'
				) &&
					this.body.blocked.down &&
					this.shortHop(),
					(this.body.blocked.left || this.body.blocked.right) && this.shortHop();
			}
			!this.agro && !this.convertedToAgro && this.health <= 2 && this.becomeAgro();
		}
	}),
	(FaceGame.Enemy8.prototype.shortHop = function () {
		this.body.blocked.down &&
			!this.customParams.ShortHopDelayTimer > 0 &&
			((this.body.velocity.y = this.hopHeight),
			(this.customParams.ShortHopDelayTimer = this.hopDelay));
	}),
	(FaceGame.Enemy8.prototype.surpriseJump = function () {
		(this.body.allowGravity = !0),
			(this.body.velocity.y = -475),
			(this.surprise = !1),
			this.zombieSFX1.play(),
			(this.zEmit.x = this.x),
			(this.zEmit.y = this.y),
			this.zEmit.start(!0, 2e3, null, 12);
	}),
	(FaceGame.Enemy8.prototype.becomeAgro = function () {
		(this.moveSpeed = 100),
			(this.frame = 1),
			(this.hopHeight = -225),
			(this.hopDelay = 50),
			(this.convertedToAgro = !0),
			this.zombieSFX1.play();
	}),
	(FaceGame.Enemy8.prototype.zTrapComplete = function () {
		(this.zTrapDone = !0),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !0),
			(this.body.collideWorldBounds = !0),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			this.zombieSFX1.play(),
			this.game.time.events.add(
				600,
				function () {
					this.zTrap = !1;
				},
				this
			);
	}),
	(FaceGame.Enemy8.prototype.damage = function (t, e, s) {
		(Phaser.Sprite.prototype.damage.call(this, t, e, s), this.health <= 0)
			? (this.death2SFX.play(),
			  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 8)),
			  this.enemyEmitter.makeParticles([
					'blood1',
					'blood2',
					'blood3',
					'blood4',
					'eyeball',
					'brain',
					'spleen',
					'skull'
			  ]),
			  this.game.physics.arcade.enable(this.enemyEmitter),
			  (this.enemyEmitter.minParticleScale = 0.5),
			  (this.enemyEmitter.maxParticleScale = 0.5),
			  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
			  'jump' == e
					? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
					: 'shoot' == e &&
					  ('right' == s
							? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-50, 50))
							: 'left' == s &&
							  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-50, 50))),
			  this.enemyEmitter.start(!0, 1e3, null, 8),
			  this.zTrapDone && this.game.state.callbackContext.zTrapZombieKillCounter++,
			  this.game.state.callbackContext.zTrapZombieKillCounter >= 2 &&
					(this.game.state.callbackContext.zTrapGates.children[0].openIt(),
					this.game.state.callbackContext.zTrapGates.children[1].openIt()),
			  this.kill())
			: ((this.tint = 16711680),
			  this.game.time.events.add(
					58,
					function () {
						this.alive && (this.tint = 16777215);
					},
					this
			  ),
			  this['zombieHit' + (Math.floor(5 * Math.random()) + 1) + 'SFX'].play());
	}),
	((FaceGame = FaceGame || {}).Enemy9 = function (t, e, s, i, a, h, o, r) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = r),
			(this.player = h),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.health = 6),
			this.game.physics.arcade.enableBody(this),
			(this.customParams = {
				shootCounter: 0,
				hopCount: 0,
				hopDirection: 0,
				prepareToast: !1,
				shaking: !1,
				shakeDirection: 1,
				shakeCount: 0
			}),
			(this.direction = 1),
			(this.body.velocity.x = 0),
			(this.body.velocity.y = 0),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.collideWorldBounds = !0),
			(this.body.allowGravity = !0),
			(this.toasterSmashSFX = this.game.add.audio('toasterSmashSFX')),
			(this.toasterSmashSFX.volume = 0.2),
			(this.toasterHitSFX = this.game.add.audio('toasterHitSFX')),
			(this.toasterHitSFX.volume = 0.2),
			(this.toasterSFX = this.game.add.audio('toasterSFX')),
			(this.toasterSFX.volume = 0.2),
			(this.frame = 0),
			(this.toasts = o),
			(this.autoCull = !0);
	}),
	(FaceGame.Enemy9.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Enemy9.prototype.constructor = FaceGame.Enemy9),
	(FaceGame.Enemy9.prototype.update = function () {
		var t = this.x - this.player.x,
			e = this.y - this.player.y;
		this.player.x <= this.x &&
			1 == this.scale.x &&
			(this.scale.setTo(-1, 1), (this.direction = -1)),
			this.player.x >= this.x &&
				-1 == this.scale.x &&
				(this.scale.setTo(1, 1), (this.direction = 1)),
			(this.body.blocked.down || this.body.touching.down) &&
				5 != this.customParams.hopCount &&
				this.alive &&
				this.hop(),
			(this.body.blocked.down || this.body.touching.down) &&
				5 == this.customParams.hopCount &&
				((this.body.velocity.x = 0),
				this.customParams.prepareToast ||
					((this.customParams.prepareToast = !0), this.prepareToast(t, e), (this.frame = 1))),
			this.customParams.prepareToast &&
				(this.customParams.shakeCount++, this.customParams.shakeCount >= 4 && this.shake());
	}),
	(FaceGame.Enemy9.prototype.shake = function () {
		this.customParams.shakeDirection > 0 ? (this.x = this.x + 2) : (this.x = this.x - 2),
			(this.customParams.shakeDirection *= -1),
			(this.customParams.shakeCount = 0);
	}),
	(FaceGame.Enemy9.prototype.hop = function () {
		this.customParams.hopCount++,
			this.customParams.hopCount < 5 &&
				((this.customParams.hopDirection = 0 == this.customParams.hopDirection ? 1 : 0),
				(this.body.velocity.y = -200),
				1 == this.customParams.hopDirection
					? (this.body.velocity.x = -30)
					: (this.body.velocity.x = 30));
	}),
	(FaceGame.Enemy9.prototype.prepareToast = function (t, e) {
		this.game.time.events.add(
			1600,
			function () {
				this.alive &&
					((this.body.velocity.y = -200),
					(this.customParams.hopCount = -1),
					(this.customParams.prepareToast = !1),
					(this.customParams.shakeCount = 0),
					(this.frame = 0),
					Math.abs(t) < 500 &&
						Math.abs(e) < 300 &&
						(this.shoot(), this.shoot(), this.toasterSFX.play()));
			},
			this
		);
	}),
	(FaceGame.Enemy9.prototype.shoot = function () {
		if (this.alive) {
			var t = this.toasts.getFirstExists(!1),
				e = 2 + 8 * Math.random();
			t
				? (t.reset(this.x, this.y), (t.spinSpeed = e * this.direction), t.loadTexture('toast'))
				: ((t = new FaceGame.Toast(this.game, this.x, this.y, e * this.direction, 'toast')),
				  this.toasts.add(t));
			var s = 90 + 60 * Math.random(),
				i = 270 * Math.random() - 470;
			(t.body.velocity.x = s * this.direction), (t.body.velocity.y = i);
		}
	}),
	(FaceGame.Enemy9.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.toasterSmashSFX.play(),
				  (this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				  this.enemyEmitter.makeParticles([
						'tEmit1',
						'tEmit2',
						'tEmit3',
						'tEmit4',
						'tEmit5',
						'brain'
				  ]),
				  this.game.physics.arcade.enable(this.enemyEmitter),
				  (this.enemyEmitter.minParticleScale = 0.5),
				  (this.enemyEmitter.maxParticleScale = 0.5),
				  (this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
								: 'left' == s &&
								  (this.enemyEmitter.setXSpeed(-250, -350),
								  this.enemyEmitter.setYSpeed(-100, 100))),
				  this.enemyEmitter.start(!0, 1e3, null, 8),
				  this.destroy())
				: ((this.tint = 16711680),
				  this.game.time.events.add(
						58,
						function () {
							this.alive && (this.tint = 16777215);
						},
						this
				  ),
				  this.toasterHitSFX.play());
	}),
	((FaceGame = FaceGame || {}).Fire = function (t, e, s, i, a, h, o, r, l) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = l),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			(this.fireSFX = this.game.add.audio('fireSFX')),
			(this.fireSFX.volume = 0.2),
			(this.fireSFX.loop = !0),
			h && (h *= 0.1),
			(this.customParams = { slowBurn: a || !1, delayTime: h || 0, painful: !1, delayUnlock: !1 }),
			(this.beginAnim = this.animations.add('fire_begin', [1, 2], 15, !0)),
			(this.changeAnim = this.animations.add('fire_change', [3, 4], 15, !1)),
			(this.changeBackAnim = this.animations.add('fire_changeBack', [4, 3, 2, 1], 15, !1)),
			(this.painAnim = this.animations.add('fire_pain', [5, 6], 15, !0)),
			(this.slowBurnAnim = this.animations.add('fire_slowBurn', [4, 7], 15, !0)),
			(this.body.checkCollision.up = !1),
			this.customParams.slowBurn
				? 'down' == r
					? o
						? (this.scale.setTo(-0.5), this.anchor.setTo(0.5, 0.645))
						: (this.scale.setTo(-1), this.anchor.setTo(0.5, 0.645))
					: 'right' == r
					? o
						? ((this.angle = 90), this.scale.setTo(0.5), this.anchor.setTo(0.5, 0.54))
						: ((this.angle = 90), this.anchor.setTo(0.5, 0.54))
					: 'left' == r
					? o
						? ((this.angle = -90), this.scale.setTo(0.5), this.anchor.setTo(0.5, 0.54))
						: ((this.angle = -90), this.anchor.setTo(0.5, 0.54))
					: o
					? (this.scale.setTo(0.5), this.anchor.setTo(0.5, 1))
					: (this.scale.setTo(1), this.anchor.setTo(0.5, 1))
				: 'down' == r
				? o
					? (this.scale.setTo(-0.5), this.anchor.setTo(0.5, 0.54))
					: (this.scale.setTo(-1), this.anchor.setTo(0.5, 0.54))
				: 'right' == r
				? o
					? ((this.angle = 90), this.scale.setTo(0.5), this.anchor.setTo(0.5, 0.54))
					: ((this.angle = 90), this.anchor.setTo(0.5, 0.54))
				: 'left' == r
				? o
					? ((this.angle = -90), this.scale.setTo(0.5), this.anchor.setTo(0.5, 0.54))
					: ((this.angle = -90), this.anchor.setTo(0.5, 0.54))
				: o
				? (this.scale.setTo(0.5), this.anchor.setTo(0.5, 1))
				: (this.scale.setTo(1), this.anchor.setTo(0.5, 1)),
			'left' == r
				? this.customParams.slowBurn
					? (this.slowBurnAnim.play(),
					  o ? this.body.setSize(55, 55, 9) : this.body.setSize(55, 55, 18))
					: (o ? this.body.setSize(85, 35) : this.body.setSize(85, 35, 3), (this.frame = 0))
				: 'right' == r
				? this.customParams.slowBurn
					? (this.slowBurnAnim.play(),
					  o ? this.body.setSize(55, 55, -9) : this.body.setSize(55, 55, -18))
					: (o ? this.body.setSize(85, 35) : this.body.setSize(85, 35, -3), (this.frame = 0))
				: this.customParams.slowBurn
				? (this.slowBurnAnim.play(), this.body.setSize(35, 55))
				: (this.body.setSize(35, 85), (this.frame = 0)),
			(this.autoCull = !0);
	}),
	(FaceGame.Fire.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Fire.prototype.constructor = FaceGame.Fire),
	(FaceGame.Fire.prototype.update = function () {
		this.customParams.delayUnlock ||
			this.customParams.slowBurn ||
			(this.customParams.delayTime--,
			this.customParams.delayTime <= 0 && ((this.customParams.delayUnlock = !0), this.begin())),
			(0 != this.frame && 1 != this.frame && 2 != this.frame && 3 != this.frame) ||
				!this.customParams.painful ||
				((this.customParams.painful = !1), this.fireSFX.isPlaying && this.fireSFX.stop()),
			(4 != this.frame && 5 != this.frame && 6 != this.frame && 7 != this.frame) ||
				this.customParams.painful ||
				((this.customParams.painful = !0),
				this.x > this.game.camera.x &&
					this.x < this.game.camera.x + this.game.camera.width &&
					this.y > this.game.camera.y &&
					this.y < this.game.camera.y + this.game.camera.height &&
					this.fireSFX.play());
	}),
	(FaceGame.Fire.prototype.off = function () {
		(this.frame = 0),
			this.beginAnim.stop(),
			this.changeAnim.stop(),
			this.changeBackAnim.stop(),
			this.painAnim.stop(),
			this.game.time.events.add(
				3e3,
				function () {
					this.begin();
				},
				this
			);
	}),
	(FaceGame.Fire.prototype.begin = function () {
		this.beginAnim.play(),
			this.game.time.events.add(
				2e3,
				function () {
					this.changeAnim.play(),
						this.game.time.events.add(
							150,
							function () {
								this.pain();
							},
							this
						);
				},
				this
			);
	}),
	(FaceGame.Fire.prototype.pain = function () {
		this.painAnim.play(),
			this.game.time.events.add(
				2e3,
				function () {
					this.changeBackAnim.play(),
						this.game.time.events.add(
							250,
							function () {
								this.off();
							},
							this
						);
				},
				this
			);
	}),
	((FaceGame = FaceGame || {}).FoxLaser = function (t, e, s, i) {
		Phaser.Sprite.call(this, t, e, s, 'foxLaser'),
			(this.game = t),
			(this.player = i),
			(this.checkWorldBounds = !0),
			(this.outOfBoundsKill = !0),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x,
				timesCollided: 0,
				activatedSwitch: !1,
				fullLength: !1
			}),
			(this.alreadyHitIDs = []);
	}),
	(FaceGame.FoxLaser.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.FoxLaser.prototype.constructor = FaceGame.FoxLaser),
	(FaceGame.FoxLaser.prototype.update = function () {
		(this.x < this.game.camera.x - 150 ||
			(this.x > this.game.camera.x + this.game.camera.width + 150 && this.alive)) &&
			this.kill(),
			this.customParams.fullLength ||
				((this.scale.x += 0.06),
				this.scale.x >= 1 &&
					((this.scale.x = 1),
					(this.customParams.fullLength = !0),
					(this.body.velocity.x = FaceGame.GameState.BULLET_SPEED * (2 * -this.anchor.y))));
	}),
	((FaceGame = FaceGame || {}).Frisbee = function (t, e, s, i) {
		Phaser.Sprite.call(this, t, e, s, 'frisbee'),
			(this.game = t),
			(this.player = i),
			(this.checkWorldBounds = !0),
			(this.outOfBoundsKill = !0),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x,
				timesCollided: 0,
				activatedSwitch: !1,
				ableToReflect: !1
			}),
			this.lastEnemyHitID;
	}),
	(FaceGame.Frisbee.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Frisbee.prototype.constructor = FaceGame.Frisbee),
	(FaceGame.Frisbee.prototype.update = function () {
		(this.x < this.game.camera.x - 150 ||
			this.x > this.game.camera.x + this.game.camera.width + 150) &&
			this.kill();
	}),
	((FaceGame = FaceGame || {}).GameState = {
		init: function (t) {
			(this.levelData = t
				? JSON.parse(this.game.cache.getText(t))
				: JSON.parse(this.game.cache.getText('level24data'))),
				(this.currentLevel = this.levelData.levelMap || 'levelA'),
				(this.GAME_GRAVITY = 600),
				(this.RUNNING_SPEED = 280),
				(this.JUMPING_SPEED = 360),
				(this.BOUNCING_SPEED = 220),
				(this.ACC = 7),
				(this.DEC = 25),
				(this.FRICTION = 16),
				(this.FASTFALL = 285),
				(this.BULLET_SPEED = -1e3),
				(this.CONV_MOD = 0),
				(this.jumpCount = 0),
				(this.cursors = this.game.input.keyboard.createCursorKeys()),
				(this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z)),
				(this.x = this.game.input.keyboard.addKey(Phaser.Keyboard.X)),
				(this.c = this.game.input.keyboard.addKey(Phaser.Keyboard.C)),
				(this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)),
				(this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC));
		},
		create: function () {
			if (
				((this.game.renderer.renderSession.roundPixels = !1),
				null === localStorage.getItem('DBdeathTracker')
					? (this.deathTracker = {
							level1: 0,
							level2: 0,
							level3: 0,
							level4: 0,
							level5: 0,
							total: 0
					  })
					: (this.deathTracker = JSON.parse(localStorage.getItem('DBdeathTracker'))),
				null === localStorage.getItem('DBdonutTracker')
					? (this.donutTracker = {
							level1got: 0,
							level1max: 58,
							level2got: 0,
							level2max: 57,
							level3got: 0,
							level3max: 79,
							level4got: 0,
							level4max: 120,
							level5got: 0,
							level5max: 99
					  })
					: (this.donutTracker = JSON.parse(localStorage.getItem('DBdonutTracker'))),
				null === localStorage.getItem('DBcharTracker')
					? (this.charTracker = {
							level1got: [],
							level1max: 3,
							level2got: [],
							level2max: 3,
							level3got: [],
							level3max: 3,
							level4got: [],
							level4max: 5,
							level5got: [],
							level5max: 3
					  })
					: (this.charTracker = JSON.parse(localStorage.getItem('DBcharTracker'))),
				null === localStorage.getItem('DBweaponTracker')
					? (this.weaponTracker = {
							level1got: [],
							level1max: 1,
							level2got: [],
							level2max: 1,
							level3got: [],
							level3max: 2,
							level4got: [],
							level4max: 1,
							level5got: [],
							level5max: 1
					  })
					: (this.weaponTracker = JSON.parse(localStorage.getItem('DBweaponTracker'))),
				null === localStorage.getItem('DBlevelTracker')
					? (this.levelTracker = {
							opening: !1,
							level1: !1,
							level2: !1,
							level3: !1,
							level4: !1,
							level5: !1,
							completed: !1
					  })
					: (this.levelTracker = JSON.parse(localStorage.getItem('DBlevelTracker'))),
				null === localStorage.getItem('DBchars')
					? (this.characterArray = ['donut boy'])
					: (this.characterArray = JSON.parse(localStorage.getItem('DBchars'))),
				null === localStorage.getItem('DBcharIndex')
					? (this.characterIndex = 0)
					: (this.characterIndex = Number(localStorage.getItem('DBcharIndex'))),
				('levelX' != this.currentLevel && 'levelZ' != this.currentLevel) ||
					(this.characterIndex = 0),
				null === localStorage.getItem('DBweaponIndex')
					? (this.weaponIndex = 0)
					: (this.weaponIndex = Number(localStorage.getItem('DBweaponIndex'))),
				null === localStorage.getItem('DBweapons')
					? (this.weaponObj = [
							{ name: 'pistol', has: !0, ammo: 1e3, maxAmmo: 1e3 },
							{ name: 'clobb', has: !1, ammo: 200, maxAmmo: 200 },
							{ name: 'shotgun', has: !1, ammo: 40, maxAmmo: 40 },
							{ name: 'bubble gun', has: !1, ammo: 808, maxAmmo: 808 },
							{ name: 'laser', has: !1, ammo: 808, maxAmmo: 808 },
							{ name: 'frisbee', has: !1, ammo: 808, maxAmmo: 808 },
							{ name: 'croissant', has: !1, ammo: 808, maxAmmo: 808 },
							{ name: 'sex pistol', has: !1, ammo: 69, maxAmmo: 69 }
					  ])
					: (this.weaponObj = JSON.parse(localStorage.getItem('DBweapons'))),
				this.loadLevel(),
				(this.overlayActive = !1),
				'levelX' != this.currentLevel && 'levelZ' != this.currentLevel && this.beginNewOverlay(),
				this.game.device.desktop || this.createOnscreenControls(),
				(this.emitter = this.game.add.emitter(0, 0, 15)),
				this.emitter.makeParticles([
					'goalEmit1',
					'goalEmit2',
					'goalEmit3',
					'goalEmit4',
					'goalEmit5',
					'mezcal'
				]),
				this.game.physics.arcade.enable(this.emitter),
				this.emitter.setYSpeed(-150, 150),
				this.emitter.setXSpeed(-150, 150),
				(this.emitter.gravity = this.GAME_GRAVITY),
				(this.deathEmitter = this.game.add.emitter(0, 0, 15)),
				this.deathEmitter.makeParticles(['eyeball', 'brain', 'spleen', 'skull', 'real_heart']),
				this.game.physics.arcade.enable(this.deathEmitter),
				this.deathEmitter.setYSpeed(-250, 250),
				this.deathEmitter.setXSpeed(-250, 250),
				(this.deathEmitter.minParticleScale = 0.5),
				(this.deathEmitter.maxParticleScale = 0.5),
				(this.deathEmitter.gravity = this.GAME_GRAVITY),
				this.deathEmitter.bounce.setTo(0.5, 0.8),
				(this.dropletEmitter = this.game.add.emitter(this.player.x, this.player.top + 20, 200)),
				(this.dropletEmitter.width = Math.abs(this.player.width - 10)),
				this.dropletEmitter.makeParticles('water_drop'),
				this.game.physics.arcade.enable(this.dropletEmitter),
				(this.dropletEmitter.minParticleScale = 1),
				(this.dropletEmitter.maxParticleScale = 1.2),
				(this.dropletEmitter.minParticleAlpha = 0.3),
				(this.dropletEmitter.maxParticleAlpha = 0.7),
				(this.dropletEmitter.gravity = this.GAME_GRAVITY),
				this.dropletEmitter.setYSpeed(0),
				this.dropletEmitter.setXSpeed(0),
				this.dropletEmitter.start(!1, 2e3, null, 200),
				(this.dropletEmitter.on = !1),
				(this.yayEmitter = this.game.add.emitter(0, 0, 70)),
				this.yayEmitter.makeParticles([
					'yay1',
					'yay2',
					'yay3',
					'yay4',
					'yay5',
					'yay6',
					'yay7',
					'yay8',
					'yay9',
					'yay10'
				]),
				this.game.physics.arcade.enable(this.yayEmitter),
				this.yayEmitter.setYSpeed(-150, 150),
				this.yayEmitter.setXSpeed(-150, 150),
				(this.yayEmitter.minParticleScale = 3),
				(this.yayEmitter.maxParticleScale = 4.2),
				(this.yayEmitter.minParticleAlpha = 0.8),
				(this.yayEmitter.maxParticleAlpha = 1),
				(this.yayEmitter.gravity = this.GAME_GRAVITY / 2.8),
				(this.jumpSound = this.game.add.audio('jump')),
				(this.jumpSound.volume = 0.2),
				(this.swimSFX = this.game.add.audio('swimSFX')),
				(this.swimSFX.volume = 0.6),
				(this.splashSFX = this.game.add.audio('splashSFX')),
				(this.splashSFX.volume = 0.8),
				('levelR' != this.currentLevel && 'levelAA' != this.currentLevel) ||
					((this.sizzleSFX = this.game.add.audio('sizzleSFX')), (this.sizzleSFX.volume = 0.4)),
				(this.levelTrack = this.levelData.levelMusic || 'level3music'),
				(this.levelMusic = this.game.add.audio(this.levelTrack)),
				(this.levelMusic.volume = 0.5),
				(this.levelMusic.loop = !0),
				(this.deadNoise = this.game.add.audio('uhoh')),
				(this.deadNoise.volume = 1),
				(this.getGoalTune = this.game.add.audio('getGoal')),
				(this.getGoalTune.volume = 0.5),
				(this.pickupSFX = this.game.add.audio('pickupSFX')),
				(this.pickupSFX.volume = 0.2),
				(this.alreadyHaveMGSSFX = this.game.add.audio('alreadyHaveMGSSFX')),
				(this.alreadyHaveMGSSFX.volume = 0.2),
				(this.eatSFX = this.game.add.audio('eatSFX')),
				(this.eatSFX.volume = 0.2),
				(this.playerHurtSFX = this.game.add.audio('playerHurtSFX')),
				(this.playerHurtSFX.volume = 0.2),
				(this.gunshot = this.game.add.audio('gunshot')),
				(this.gunshot.volume = 0.2),
				(this.pistolSFX = this.game.add.audio('pistolSFX')),
				(this.pistolSFX.volume = 0.2),
				(this.shotgunSFX = this.game.add.audio('shotgunSFX')),
				(this.shotgunSFX.volume = 0.2),
				(this.milonSFX = this.game.add.audio('milonSFX')),
				(this.milonSFX.volume = 0.4),
				(this.laserSFX = this.game.add.audio('laserSFX')),
				(this.laserSFX.volume = 0.2),
				'levelT' == this.currentLevel &&
					((this.slapSFX = this.game.add.audio('slapSFX')), (this.slapSFX.volume = 0.5)),
				(this.frisbeeSFX = this.game.add.audio('frisbeeSFX')),
				(this.frisbeeThudSFX = this.game.add.audio('frisbeeThudSFX')),
				(this.frisbeeThudSFX.volume = 0.2),
				(this.yaySFX = this.game.add.audio('yay')),
				(this.yaySFX.volume = 0.2),
				'levelAA' == this.currentLevel &&
					((this.evilLaughSFX = this.game.add.audio('evilLaughSFX')),
					(this.evilLaughSFX.volume = 0.2),
					(this.puggsyDieSFX = this.game.add.audio('puggsyDieSFX')),
					(this.puggsyDieSFX.volume = 0.2)),
				(this.lockedDoorSFX = this.game.add.audio('lockedDoorSFX')),
				(this.lockedDoorSFX.volume = 0.2),
				(this.gateOpeningSFX = this.game.add.audio('gateOpeningSFX')),
				(this.gateOpeningSFX.volume = 0.2),
				(this.staticSFX = this.game.add.audio('staticSFX')),
				(this.staticSFX.volume = 0.2),
				(this.weaponChangeSFX = this.game.add.audio('weaponChangeSFX')),
				(this.weaponChangeSFX.volume = 0.2),
				(this.weaponSwitchSFX = this.game.add.audio('weaponSwitchSFX')),
				(this.weaponSwitchSFX.volume = 0.2),
				(this.weaponGetSFX = this.game.add.audio('weaponGetSFX')),
				(this.weaponGetSFX.volume = 0.3),
				(this.doubleJumpAngle = 0),
				(this.doubleJumpActive = !1),
				(this.doubleJumpDirection = void 0),
				this.initBullets(),
				(this.lostHat = !1),
				(this.invincibleBlinkLooper = -1),
				(this.hatSpin = !1),
				(this.bubbleGunUpOrDown = 0),
				this.weaponControlLabel,
				this.charControlLabel,
				(this.selectedPauseOption = 0),
				(this.pauseConfirm = !1),
				(this.pauseConfirmOption = 0),
				'levelZ' != this.currentLevel)
			) {
				if ('levelX' != this.currentLevel) {
					(this.scoreLabel = this.game.add.text(
						30,
						30,
						'Donuts: ' + this.player.customParams.donutCount + ' / ' + this.totalDonut,
						{ font: '20px Geo', fill: '#fff' }
					)),
						(this.scoreLabel.fixedToCamera = !0),
						(this.scoreLabel.stroke = '#000000'),
						(this.scoreLabel.strokeThickness = 2),
						(this.healthLabel = this.game.add.text(30, 50, 'Health: ', {
							font: '20px Geo',
							fill: '#fff'
						})),
						(this.healthLabel.fixedToCamera = !0),
						(this.healthLabel.stroke = '#000000'),
						(this.healthLabel.strokeThickness = 2),
						(this.healthIcons = []);
					for (var t = 0; t < this.player.customParams.maxHealth; t++)
						t < this.player.customParams.health
							? (this.healthIcons[t] = this.add.sprite(
									this.healthLabel.x + 0.5 * this.healthLabel.width + 30 + 12 * t,
									53,
									'healthHUD1'
							  ))
							: (this.healthIcons[t] = this.add.sprite(
									this.healthLabel.x + 0.5 * this.healthLabel.width + 30 + 12 * t,
									53,
									'healthHUD2'
							  )),
							(this.healthIcons[t].fixedToCamera = !0),
							this.healthIcons[t].anchor.setTo(0, 0);
				}
				(this.bulletIcon = this.add.sprite(this.game.camera.width - 30, 30, 'bullet_icon_pistol')),
					(this.bulletIcon.fixedToCamera = !0),
					this.bulletIcon.anchor.setTo(1, 0),
					(this.weaponLabel = this.game.add.text(
						this.bulletIcon.x - 45,
						37,
						this.weaponObj[this.weaponIndex].name,
						{ font: '20px Geo', fill: '#fff' }
					)),
					(this.weaponLabel.fixedToCamera = !0),
					this.weaponLabel.anchor.setTo(1, 0),
					(this.weaponLabel.stroke = '#000000'),
					(this.weaponLabel.strokeThickness = 2),
					(this.weaponLabel.text = this.weaponObj[this.weaponIndex].name),
					this.bulletIcon.loadTexture(
						'bullet_icon_' + this.weaponObj[this.weaponIndex].name.replace(' ', '')
					);
			}
			if (
				((this.klobbCounter = 0),
				'levelW' == this.currentLevel ||
					'levelV' == this.currentLevel ||
					'levelY' == this.currentLevel ||
					'levelR' == this.currentLevel ||
					'levelAA' == this.currentLevel)
			) {
				(this.tileReplaceTimer = this.game.time.create(!1)), this.tileReplaceTimer.start();
				const t = this.levelData.tileswapper.tile1,
					e = this.levelData.tileswapper.tile2,
					s = this.levelData.tileswapper.topleftX,
					i = this.levelData.tileswapper.topleftY,
					a = this.levelData.tileswapper.w,
					h = this.levelData.tileswapper.h;
				this.scheduleTileReplace(t, e, s, i, a, h, 0);
			}
		},
		update: function () {
			if (
				(this.game.physics.arcade.collide(this.player, this.collisionLayer),
				this.game.physics.arcade.collide(this.goal, this.collisionLayer),
				this.game.physics.arcade.collide(this.deathEmitter, this.collisionLayer),
				this.game.physics.arcade.collide(this.dropletEmitter, this.collisionLayer),
				this.game.physics.arcade.collide(this.enemies, this.collisionLayer),
				this.game.physics.arcade.collide(this.enemies3, this.collisionLayer),
				this.game.physics.arcade.collide(this.enemies6, this.collisionLayer),
				this.game.physics.arcade.collide(this.enemies7, this.collisionLayer),
				this.game.physics.arcade.collide(this.enemies10, this.collisionLayer),
				this.game.physics.arcade.collide(this.enemies13, this.collisionLayer),
				this.game.physics.arcade.collide(this.crates, this.collisionLayer),
				this.game.physics.arcade.overlap(this.player, this.goal, this.getGoal, null, this),
				this.game.physics.arcade.collide(this.player, this.platforms, this.onThePlat, null, this),
				this.game.physics.arcade.collide(
					this.player,
					this.platformsFalling,
					this.onThePlatFalling,
					null,
					this
				),
				this.game.physics.arcade.collide(this.player, this.invisiblePlatforms),
				this.game.physics.arcade.collide(
					this.player,
					this.springLaunchers,
					this.onSpringLauncher,
					null,
					this
				),
				this.game.physics.arcade.collide(this.player, this.doors),
				this.game.physics.arcade.collide(this.player, this.crates, this.touchingCrate, null, this),
				this.game.physics.arcade.collide(this.player, this.cage, this.openCageCheck, null, this),
				this.game.physics.arcade.collide(this.player, this.hatches),
				this.game.physics.arcade.overlap(this.player, this.healths, this.getHealth, null, this),
				this.game.physics.arcade.overlap(this.player, this.hotSauces, this.getHotSauce, null, this),
				this.game.physics.arcade.overlap(this.player, this.pills, this.getPill, null, this),
				this.game.physics.arcade.overlap(this.player, this.hat, this.getHat, null, this),
				this.game.physics.arcade.overlap(this.player, this.weapons, this.getWeapon, null, this),
				this.game.physics.arcade.overlap(this.player, this.key, this.getKey, null, this),
				this.game.physics.arcade.overlap(this.player, this.donuts, this.getDonut, null, this),
				this.game.physics.arcade.overlap(
					this.player,
					this.secretCharacters,
					this.getSecretCharacter,
					null,
					this
				),
				this.player.customParams.disBoiDed ||
					(this.game.physics.arcade.overlap(
						this.player,
						this.allEnemies,
						this.jumpOnEnemy,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.player,
						this.clamPearls,
						this.jumpOnEnemy,
						null,
						this
					),
					this.game.physics.arcade.overlap(this.player, this.buzzsaws, this.hitPlayer, null, this),
					this.game.physics.arcade.overlap(
						this.player,
						this.gunbugBullets,
						this.trueEnemyBullet,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.player,
						this.dustBullets,
						this.trueEnemyBullet,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.player,
						this.gullDung,
						this.trueEnemyBullet,
						null,
						this
					),
					this.game.physics.arcade.collide(this.player, this.spikes, this.killPlayer, null, this)),
				this.game.physics.arcade.collide(
					this.allBullets,
					this.collisionLayer,
					this.bulletCollides,
					null,
					this
				),
				this.game.physics.arcade.collide(
					this.frisbees,
					this.collisionLayer,
					this.bulletCollides,
					null,
					this
				),
				this.game.physics.arcade.overlap(this.allBullets, this.crates, this.shootEnemy, null, this),
				this.game.physics.arcade.overlap(
					this.bubbleBullets,
					this.crates,
					this.shootEnemy,
					null,
					this
				),
				this.game.physics.arcade.overlap(this.foxLasers, this.crates, this.laserEnemy, null, this),
				this.game.physics.arcade.overlap(this.frisbees, this.crates, this.frisbeeEnemy, null, this),
				this.game.physics.arcade.overlap(this.kiflis, this.crates, this.kifliEnemy, null, this),
				this.game.physics.arcade.collide(
					this.allBullets,
					this.doors,
					this.bulletCollides,
					null,
					this
				),
				this.game.physics.arcade.overlap(
					this.allBullets,
					this.allEnemies,
					this.shootEnemy,
					null,
					this
				),
				this.game.physics.arcade.overlap(
					this.allBulletsTrue,
					this.clamPearls,
					this.shootEnemy,
					null,
					this
				),
				this.game.physics.arcade.overlap(
					this.allBulletsTrue,
					this.toasts,
					this.shootEnemy,
					null,
					this
				),
				this.game.physics.arcade.overlap(
					this.bubbleBullets,
					this.allEnemies,
					this.shootEnemy,
					null,
					this
				),
				this.game.physics.arcade.overlap(
					this.foxLasers,
					this.allEnemies,
					this.laserEnemy,
					null,
					this
				),
				this.game.physics.arcade.overlap(this.kiflis, this.allEnemies, this.kifliEnemy, null, this),
				this.game.physics.arcade.overlap(
					this.frisbees,
					this.allEnemies,
					this.frisbeeEnemy,
					null,
					this
				),
				this.game.physics.arcade.collide(
					this.clamPearls,
					this.collisionLayer,
					this.pearlBounce,
					null,
					this
				),
				this.game.physics.arcade.collide(
					this.dustBullets,
					this.collisionLayer,
					this.killProjectileCollide,
					null,
					this
				),
				this.game.physics.arcade.collide(this.crates),
				this.game.physics.arcade.collide(
					this.crates,
					this.allEnemies,
					this.crateOnEnemy,
					null,
					this
				),
				this.game.physics.arcade.collide(this.crates, this.hatches),
				this.game.physics.arcade.collide(this.crates, this.platformsFalling),
				this.game.physics.arcade.overlap(this.player, this.newSwitches, this.hitSwitch, null, this),
				this.game.physics.arcade.overlap(
					this.allBulletsTrue,
					this.newSwitches,
					this.hitSwitch,
					null,
					this
				),
				this.game.physics.arcade.overlap(this.crates, this.newSwitches, this.hitSwitch, null, this),
				this.game.physics.arcade.overlap(
					this.enemies,
					this.newSwitches,
					this.hitSwitch,
					null,
					this
				),
				this.game.physics.arcade.collide(this.player, this.buttons, this.onButton, null, this),
				this.game.physics.arcade.collide(this.crates, this.buttons, this.onButton, null, this),
				('levelM' != this.currentLevel && 'levelY' != this.currentLevel) ||
					(this.game.physics.arcade.collide(
						this.player,
						this.bubbles,
						this.jumpOnEnemy,
						null,
						this
					),
					this.game.physics.arcade.collide(this.clamPearls, this.doors),
					this.player.x > this.bSpawn[0].x - 250 &&
						!this.bubbleHint &&
						1 == this.newSwitches.children[2].frame &&
						((this.bubbleHint = !0), this.itemNameTextRise('Bubbles!'))),
				'levelAA' == this.currentLevel &&
					(this.game.physics.arcade.collide(this.enemies8, this.collisionLayer),
					this.game.physics.arcade.collide(this.player, this.zTrap, this.zTrapActivate, null, this),
					this.game.physics.arcade.collide(this.player, this.zTrapGates),
					this.game.physics.arcade.collide(
						this.player,
						this.chainLifts,
						this.onChainLift,
						null,
						this
					),
					this.game.physics.arcade.collide(
						this.player,
						this.elevators,
						this.onElevator,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.allBulletsTrue,
						this.graveGhosts,
						this.ghostBetray,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.player,
						this.graveGhosts,
						function () {
							'default' == this.graveGhosts.children[0].customParams.state &&
								(this.graveGhosts.children[0].betrayed(), this.gameOver());
						},
						null,
						this
					),
					this.enemies8.children[11].zTrapTransition &&
						this.enemies8.children[11].alpha <= 1 &&
						(this.enemies8.children[11].alpha += 0.01),
					!this.enemies8.children[11].zTrapDone &&
						this.enemies8.children[11].alpha >= 1 &&
						this.enemies8.children[11].zTrapComplete(),
					this.enemies8.children[22].zTrapTransition &&
						this.enemies8.children[22].alpha <= 1 &&
						(this.enemies8.children[22].alpha += 0.01),
					!this.enemies8.children[22].zTrapDone &&
						this.enemies8.children[22].alpha >= 1 &&
						this.enemies8.children[22].zTrapComplete(),
					this.game.physics.arcade.collide(this.player, this.unburyGround),
					this.game.physics.arcade.overlap(
						this.allBulletsTrue,
						this.unburyGrave,
						this.shootUnburyGrave,
						null,
						this
					),
					this.player.x > this.zTrapGates.children[2].x + 50 &&
						!this.zElevatorActivated &&
						((this.zElevatorActivated = !0),
						this.zTrapGates.children[2].closeIt(),
						this.game.time.events.add(
							1200,
							function () {
								this.elevators.children[0].start();
							},
							this
						)),
					this.game.physics.arcade.overlap(
						this.player,
						this.puggsyEgg,
						this.puggsyEasterEgg,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.allBulletsTrue,
						this.puggsyEgg,
						this.puggsyEasterEgg,
						null,
						this
					),
					this.game.time.now > this.puggsyEgg.timeLastTouched &&
						!this.puggsyEgg.ableToActivate &&
						(this.puggsyEgg.ableToActivate = !0),
					this.game.physics.arcade.collide(this.player, this.graveSecret)),
				('levelS' != this.currentLevel && 'levelT' != this.currentLevel) ||
					(this.game.physics.arcade.overlap(this.fires, this.loafs, this.igniteLoaf, null, this),
					this.game.physics.arcade.collide(this.enemies9, this.collisionLayer),
					this.game.physics.arcade.collide(this.enemies11, this.collisionLayer),
					this.game.physics.arcade.collide(this.enemies12, this.collisionLayer),
					this.game.physics.arcade.collide(this.enemies9, this.platformsFalling),
					this.game.physics.arcade.collide(this.indianaRolls, this.collisionLayer),
					this.game.physics.arcade.collide(this.hideIndianaEmit, this.collisionLayer),
					this.game.physics.arcade.collide(this.loafs, this.collisionLayer),
					this.game.physics.arcade.collide(this.breadCarts, this.collisionLayer),
					this.game.physics.arcade.collide(this.bagels, this.collisionLayer),
					this.game.physics.arcade.collide(
						this.player,
						this.breadMakers,
						this.onThePress,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.player,
						this.breadMakers,
						this.insidePress,
						null,
						this
					),
					this.game.physics.arcade.collide(
						this.player,
						this.conveyers,
						this.onTheConveyer,
						null,
						this
					),
					this.game.physics.arcade.collide(this.player, this.breadMakers),
					this.game.physics.arcade.collide(this.player, this.breadMakerChilds),
					this.game.physics.arcade.overlap(
						this.player,
						this.enemies11,
						this.enemyKnockback,
						null,
						this
					),
					this.game.physics.arcade.overlap(this.player, this.toasts, this.jumpOnEnemy, null, this),
					this.game.physics.arcade.overlap(this.player, this.fires, this.playerInFire, null, this),
					this.game.physics.arcade.overlap(this.player, this.loafs, this.playerInFire, null, this),
					this.game.physics.arcade.overlap(this.player, this.bagels, this.jumpOnEnemy, null, this),
					this.game.physics.arcade.overlap(
						this.player,
						this.conveyers,
						function () {
							this.player.customParams.touchingPress &&
								!this.player.customParams.disBoiDed &&
								this.gameOver();
						},
						null,
						this
					),
					this.game.physics.arcade.collide(this.player, this.breadCarts),
					this.game.physics.arcade.collide(
						this.loafs,
						this.conveyers,
						this.conveyerVelocity,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.breadMakers,
						this.conveyers,
						this.breadPressed,
						null,
						this
					),
					this.game.physics.arcade.collide(this.bagels, this.conveyers),
					this.game.physics.arcade.collide(this.enemies11, this.hatches),
					this.game.physics.arcade.overlap(this.enemies11, this.loafs, this.loafEnemy, null, this),
					this.game.physics.arcade.collide(
						this.crates,
						this.conveyers,
						this.conveyerVelocity,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.indianaRolls,
						this.crates,
						this.indianaRollCrushCrate,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.indianaRolls,
						this.platformsFalling,
						this.indianaRollCrushCrate,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.indianaRolls,
						this.doors,
						this.indianaRollCrushCrate,
						null,
						this
					),
					this.indianaRoll.customParams.hitTheWall ||
						this.game.physics.arcade.overlap(
							this.indianaRolls,
							this.player,
							this.indianaRollCrushPlayer,
							null,
							this
						),
					this.game.physics.arcade.overlap(
						this.allBulletsTrue,
						this.bagels,
						this.shootEnemy,
						null,
						this
					),
					this.player.x > this.doors.children[2].x + 50 &&
						!this.musicFlipped &&
						((this.musicFlipped = !0), this.levelMusic.stop(), this.recordScratchSFX.play())),
				('levelU' != this.currentLevel && 'levelV' != this.currentLevel) ||
					this.game.physics.arcade.collide(this.enemies13, this.crates),
				'levelW' == this.currentLevel &&
					(this.game.physics.arcade.collide(this.enemies14, this.collisionLayer),
					this.game.physics.arcade.collide(
						this.gullDung,
						this.collisionLayer,
						this.killProjectileCollide,
						null,
						this
					),
					this.game.physics.arcade.collide(this.player, this.fakeSand)),
				'levelX' == this.currentLevel)
			)
				if (
					(this.game.physics.arcade.collide(this.beachBalls, this.collisionLayer),
					this.game.physics.arcade.overlap(
						this.beachBalls,
						this.endChars,
						this.hitBeachBall,
						null,
						this
					),
					this.game.physics.arcade.overlap(
						this.player,
						this.beachBalls,
						this.hitBeachBall2,
						null,
						this
					),
					this.levelMusic.isPlaying || this.levelMusic.play(),
					this.creditsLabel.bottom > this.game.world.height - this.game.camera.height + 90)
				)
					this.yModFast ? (this.yMod += 10) : (this.yMod += 0.8),
						this.creditsLabel.destroy(),
						(this.creditsLabel = this.game.add.text(
							0.5 * this.game.camera.width,
							this.game.camera.height - this.yMod,
							"DONUT BOY\n\nDESIGN\nDamon Bolesta\n\nPROGRAMMING\nDamon Bolesta\n\nMUSIC\nDamon Bolesta\n\nARTWORK\nDamon Bolesta\n\nSUBLIMINAL MESSAGES\nU.S. Army\n\n\nSPECIAL THANKS\nKelly Chen\nZach Davis\nSam Murphy\nIsabella Spedale\nfreesound.org\n\n\nREGULAR THANKS\nGoogle Image Search\nDiscount Furniture\nTrader Joe's\nThe Troops\n24/7 Diners\nEgg Sandwiches\n\n\n\n\n\n\n\n\n\nThank you so much for playing my game :)",
							{ font: '25px Geo', fill: '#fff' }
						)),
						(this.creditsLabel.stroke = '#000000'),
						(this.creditsLabel.strokeThickness = 2),
						this.creditsLabel.anchor.setTo(0.5, 0),
						(this.creditsLabel.fixedToCamera = !0);
				else if (
					this.creditsLabel.bottom <= this.game.world.height - this.game.camera.height + 90 &&
					!this.creditsDone
				) {
					var t;
					(this.creditsDone = !0),
						this.findObjectsByType('beachBall', this.map, 'objectsLayer').forEach(function (e) {
							(t = new FaceGame.BeachBall(this.game, e.x, e.y, 'beachBall', this.map, this.player)),
								this.beachBalls.add(t);
						}, this),
						this.displayEndCreditsStats(),
						(this.creditsDoneLabel = this.game.add.text(
							0.5 * this.game.camera.width,
							this.game.camera.height - 40,
							'Press Enter to return to Title Screen',
							{ font: '20px Geo', fill: '#fff' }
						)),
						(this.creditsDoneLabel.stroke = '#000000'),
						(this.creditsDoneLabel.strokeThickness = 2),
						this.creditsDoneLabel.anchor.setTo(0.5, 0),
						(this.creditsDoneLabel.fixedToCamera = !0);
				}
			if (this.staticFGLayer && !this.player.body.blocked.down && !this.player.body.touching.down) {
				var e = Math.round(0.04 * this.player.x),
					s = Math.round(0.04 * (this.player.y - 15));
				this.map.getTile(e, s, this.staticFGLayer, !0).index > 0 &&
				this.map.getTile(e, s, this.staticFGLayer, !0).index < 50
					? this.underwater()
					: (this.map.getTile(e, s, this.staticFGLayer, !0).index < 0 ||
							this.map.getTile(e, s, this.staticFGLayer, !0).index > 50) &&
					  this.player.customParams.underwater &&
					  this.leftTheWater();
			}
			if (
				(1 == this.dropletEmitter.on &&
					((this.dropletEmitter.x = this.player.x),
					(this.dropletEmitter.y = this.player.top + 20),
					this.game.time.time - this.dropletTime >= 2600 && (this.dropletEmitter.on = !1)),
				this.hotEmitter &&
					1 == this.hotEmitter.on &&
					((this.hotEmitter.x = this.player.x), (this.hotEmitter.y = this.player.y)),
				this.invincibleEmitter &&
					this.player.customParams.invincibleTimer >= 0 &&
					((this.invincibleEmitter.x = this.player.x), (this.invincibleEmitter.y = this.player.y)),
				this.player.customParams.kifliTimer >= 0 && this.player.customParams.kifliTimer--,
				this.doubleJumpActive &&
					('right' == this.doubleJumpDirection &&
						(this.doubleJumpAngle < 360
							? ((this.doubleJumpAngle = this.doubleJumpAngle + 15),
							  (this.player.angle = this.doubleJumpAngle))
							: this.doubleJumpAngle >= 360 &&
							  ((this.doubleJumpActive = !1),
							  (this.doubleJumpAngle = 0),
							  (this.player.angle = 0))),
					'left' == this.doubleJumpDirection &&
						(this.doubleJumpAngle > -360
							? ((this.doubleJumpAngle = this.doubleJumpAngle - 15),
							  (this.player.angle = this.doubleJumpAngle))
							: this.doubleJumpAngle <= -360 &&
							  ((this.doubleJumpActive = !1),
							  (this.doubleJumpAngle = 0),
							  (this.player.angle = 0)))),
				this.hatSpin && (this.hat.angle = this.hat.angle + 25),
				this.game.time.now > this.timeCheck2 &&
					this.player.customParams.touchingCrate &&
					(this.player.customParams.touchingCrate = !1),
				this.game.time.now > this.timeCheck4 + 2e3 &&
					this.player.customParams.touchingPress &&
					(this.player.customParams.touchingPress = !1),
				this.game.time.now > this.timeCheck5 &&
					this.player.customParams.touchingConv &&
					((this.player.customParams.touchingConv = !1), (this.CONV_MOD = 0)),
				this.player.customParams.invincible && !this.player.customParams.secretInvincibility
					? ((this.player.alpha += 0.2 * this.invincibleBlinkLooper),
					  (this.player.alpha >= 1 || this.player.alpha <= 0.2) &&
							(this.invincibleBlinkLooper *= -1))
					: this.player.body.moves && (this.player.alpha = 1),
				this.whiteLabels.length > 0)
			)
				for (var i = 0; i < this.whiteLabels.length; i++)
					this.whiteLabels[i].alpha > -1 &&
						(this.whiteLabels[i].rise
							? ((this.whiteLabels[i].riseCounter = this.whiteLabels[i].riseCounter + 0.6),
							  (this.whiteLabels[i].x = this.player.x),
							  (this.whiteLabels[i].y = this.player.y - this.whiteLabels[i].riseCounter))
							: ((this.whiteLabels[i].x = this.player.x), (this.whiteLabels[i].y = this.player.y)),
						this.whiteLabels[i].fade &&
							(this.whiteLabels[i].alpha = this.whiteLabels[i].alpha - 0.01),
						this.whiteLabels[i].alpha <= 0 && this.whiteLabels[i].destroy(!0));
			if (
				(this.characterLabel.alpha > 0 &&
					(this.characterLabel.timer--,
					(this.characterLabel.x = this.player.x),
					(this.characterLabel.y = this.player.y + 40),
					this.characterLabel.timer <= 0 &&
						((this.characterLabel.alpha = 0), (this.characterLabel.timer = 0))),
				this.negativeMessageLabel &&
					this.negativeMessageLabel.alpha > 0 &&
					(this.negativeMessageLabel.rise
						? ((this.negativeMessageLabel.riseCounter =
								this.negativeMessageLabel.riseCounter + 0.6),
						  (this.negativeMessageLabel.x = this.player.x),
						  (this.negativeMessageLabel.y = this.player.y - this.negativeMessageLabel.riseCounter))
						: ((this.negativeMessageLabel.x = this.player.x),
						  (this.negativeMessageLabel.y = this.player.y)),
					this.negativeMessageLabel.fade &&
						(this.negativeMessageLabel.alpha = this.negativeMessageLabel.alpha - 0.01),
					this.negativeMessageLabel.alpha <= 0 && this.negativeMessageLabel.destroy(!0)),
				this.player.alive &&
					!this.player.customParams.emit &&
					this.player.customParams.allowMovement &&
					this.player.body.moves &&
					this.player.alpha > 0 &&
					this.movePlayer(),
				this.player.bottom + 12 >= this.game.world.height && this.player.body.moves)
			) {
				if (!this.player.alive) return;
				this.gameOver();
			}
			if (
				(this.player.alive &&
					(this.c.onDown.add(this.changeCharacter, this),
					this.x.onDown.add(this.changeWeapon, this),
					'levelX' == this.currentLevel
						? (this.enter.onDown.add(function () {
								this.creditsDone &&
									(this.stopSFXBeforeChange(), this.state.start('Menu'), this.levelMusic.stop());
						  }, this),
						  this.enter.isDown && (this.creditsDone || (this.yModFast = !0)),
						  this.creditsDone ||
								this.enter.onUp.add(function () {
									this.yModFast = !1;
								}, this))
						: 'levelZ' == this.currentLevel
						? this.enter.onDown.add(function () {
								for (var t = 0; t < this.fires.children.length; t++)
									this.fires.children[t].fireSFX.isPlaying && this.fires.children[t].fireSFX.stop();
								this.donutAlarmSFX.stop(),
									(this.levelTracker.opening = !0),
									localStorage.setItem('DBlevelTracker', JSON.stringify(this.levelTracker)),
									this.game.state.start('Game', !0, !1, 'level21data');
						  }, this)
						: (this.enter.onDown.add(this.pauseGame, this),
						  this.esc.onDown.add(this.pauseGame, this))),
				this.player.customParams.underwater &&
					this.player.body.velocity.y > 260 &&
					(this.player.body.velocity.y = 260),
				('levelO' != this.currentLevel &&
					'levelP' != this.currentLevel &&
					'levelQ' != this.currentLevel &&
					'levelR' != this.currentLevel &&
					'levelAA' != this.currentLevel) ||
					!this.player.customParams.underwater ||
					(this.hitPlayer(),
					this.sizzleSFX.isPlaying || this.player.customParams.disBoiDed || this.sizzleSFX.play()),
				0 == this.weaponIndex &&
					this.player.alive &&
					this.z.onDown.add(this.createPlayerBullet, this),
				1 == this.weaponIndex &&
					this.player.alive &&
					(this.z.isDown &&
						(this.klobbCounter % 6 == 0 && this.createPlayerBullet(), this.klobbCounter++),
					this.z.onUp.addOnce(function () {
						1 == this.weaponIndex && (this.klobbCounter = 0);
					}, this)),
				2 == this.weaponIndex &&
					this.player.alive &&
					this.z.onDown.add(this.createShotgunBullet, this),
				3 == this.weaponIndex &&
					this.player.alive &&
					this.z.onDown.add(this.createBubbleBullet, this),
				4 == this.weaponIndex && this.player.alive && this.z.onDown.add(this.createFoxLaser, this),
				5 == this.weaponIndex && this.player.alive && this.z.onDown.add(this.createFrisbee, this),
				6 == this.weaponIndex && this.player.alive && this.z.onDown.add(this.createKifli, this),
				this.staticSwitch &&
					this.staticSwitch.alive &&
					((this.staticSwitch.x = this.player.x), (this.staticSwitch.y = this.player.y)),
				this.player.customParams.hasHat &&
					this.player.alive &&
					!this.lostHat &&
					this.player.alpha > 0 &&
					(0 == this.player.customParams.crouching
						? (this.hat.y = this.player.y - 20)
						: (this.hat.y = this.player.y),
					this.player.customParams.facingRight
						? ((this.hat.x = this.player.x + 5), this.hat.scale.setTo(0.5, 0.5))
						: ((this.hat.x = this.player.x - 3), this.hat.scale.setTo(-0.5, 0.5))),
				this.levelData.hat && this.hat.y - 4 >= this.game.world.height)
			) {
				if (!this.hat.alive) return;
				this.hat.kill();
			}
		},
		loadLevel: function () {
			(this.map = this.add.tilemap(this.currentLevel)),
				this.negativeMessageLabel && (this.negativeMessageLabel.alpha = -1),
				(this.conveyers = this.add.group()),
				this.createConveyers(),
				(this.doors = this.add.group()),
				this.createDoors(),
				(this.buttons = this.add.group()),
				this.createButtons(),
				(this.breadMakerChilds = this.add.group()),
				'levelY' != this.currentLevel
					? this.map.addTilesetImage('cooltile', 'tiles_dec')
					: this.map.addTilesetImage('tilesetDEC', 'tiles_dec'),
				'levelZ' == this.currentLevel ||
				'levelW' == this.currentLevel ||
				'levelX' == this.currentLevel
					? this.map.addTilesetImage('beachParallaxBG', 'beachParallaxBG')
					: ('levelAA' != this.currentLevel && 'levelT' != this.currentLevel) ||
					  this.map.addTilesetImage('parallaxTest', 'pbgtest'),
				(this.staticBGLayer = this.map.createLayer('staticBGLayer')),
				(this.parallaxBGLayer = this.map.createLayer('parallaxBGLayer')),
				(this.collisionLayer = this.map.createLayer('collisionLayer')),
				(this.parallaxBGLayer.scrollFactorX = 0.3),
				(this.parallaxBGLayer.scrollFactorY = 0.9),
				'levelE' == this.currentLevel ||
				'levelF' == this.currentLevel ||
				'levelG' == this.currentLevel ||
				'levelH' == this.currentLevel ||
				'levelO' == this.currentLevel ||
				'levelP' == this.currentLevel ||
				'levelQ' == this.currentLevel ||
				'levelR' == this.currentLevel ||
				'levelW' == this.currentLevel ||
				'levelX' == this.currentLevel ||
				'levelAA' == this.currentLevel
					? (this.game.world.sendToBack(this.staticBGLayer),
					  this.game.world.sendToBack(this.parallaxBGLayer))
					: this.game.world.sendToBack(this.staticBGLayer),
				this.map.setCollisionBetween(1, 1800, !0, 'collisionLayer'),
				this.collisionLayer.resizeWorld();
			var t = this.findObjectsByType('goal', this.map, 'objectsLayer');
			if (
				('' != t &&
					((this.goal = this.add.sprite(t[0].x, t[0].y, this.levelData.goalFace)),
					this.goal.scale.setTo(0.5),
					this.goal.anchor.setTo(0.5),
					('levelAA' != this.currentLevel &&
						'levelV' != this.currentLevel &&
						'levelT' != this.currentLevel &&
						'levelW' != this.currentLevel) ||
						this.goal.scale.setTo(-0.5, 0.5),
					this.game.physics.arcade.enable(this.goal),
					(this.goal.body.allowGravity = !0),
					(this.goal.body.gravity.y = this.GAME_GRAVITY),
					(this.goal.body.checkCollision.up = !1),
					(this.goal.nextLevel = t[0].properties.nextLevel)),
				this.map.objects.objectsDecorationLayer &&
					((this.pumpkins = this.add.group()), this.createPumpkins()),
				(this.switches = this.add.group()),
				this.createSwitches(),
				(this.newSwitches = this.add.group()),
				this.createNewSwitches(),
				(this.platforms = this.add.group()),
				(this.platformsFalling = this.add.group()),
				(this.invisiblePlatforms = this.add.group()),
				this.createPlatforms(),
				(this.springLaunchers = this.add.group()),
				this.createSpringLaunchers(),
				'levelZ' == this.currentLevel &&
					((this.donutEmitter = this.game.add.emitter(
						this.game.camera.x + 120,
						this.game.camera.y + 325,
						400
					)),
					this.donutEmitter.makeParticles(['donut1', 'donut2', 'donut3', 'donut4', 'donut5']),
					this.game.physics.arcade.enable(this.donutEmitter),
					this.donutEmitter.setYSpeed(-550, -350),
					this.donutEmitter.setXSpeed(-150, 150),
					(this.donutEmitter.minParticleScale = 0.22),
					(this.donutEmitter.maxParticleScale = 0.22),
					this.donutEmitter.start(!1, 1600, 10, 0),
					(this.speak = this.game.add.audio('speak')),
					(this.speak.volume = 0.2),
					(this.donutAlarmSFX = this.game.add.audio('donutAlarmSFX')),
					(this.donutAlarmSFX.volume = 0.2),
					(this.donutAlarmSFX.loop = !0),
					this.donutAlarmSFX.play(),
					(this.openingEnterLabel = this.add.text(
						this.camera.width / 2,
						this.camera.height - 20,
						'Press Enter to skip',
						{ font: '20px Geo', fill: '#fff' }
					)),
					this.openingEnterLabel.anchor.setTo(0.5),
					(this.openingEnterLabel.fixedToCamera = !0),
					(this.openingEnterLabel.stroke = '#000000'),
					(this.openingEnterLabel.strokeThickness = 2),
					this.openingText(0)),
				('levelM' != this.currentLevel && 'levelY' != this.currentLevel) ||
					((this.fishAlarmSFX = this.game.add.audio('fishAlarmSFX')),
					(this.fishAlarmSFX.volume = 0.2),
					this.fishAlarmSFX.onStop.addOnce(function () {
						this.beginAbort();
					}, this),
					(this.waterDrainSFX = this.game.add.audio('waterDrainSFX')),
					(this.waterDrainSFX.volume = 0.5),
					(this.waterDrainSFX.loop = !0),
					(this.bubbleHint = !1)),
				'levelO' == this.currentLevel ||
					'levelP' == this.currentLevel ||
					'levelQ' == this.currentLevel ||
					'levelR' == this.currentLevel ||
					'levelAA' == this.currentLevel)
			) {
				(this.zSurpriseEmitter = this.game.add.emitter(this.x, this.y, 12)),
					this.zSurpriseEmitter.makeParticles(['zombie_e1', 'zombie_e2']),
					this.game.physics.arcade.enable(this.zSurpriseEmitter),
					(this.zSurpriseEmitter.gravity = this.GAME_GRAVITY),
					this.zSurpriseEmitter.setXSpeed(-100, 100),
					this.zSurpriseEmitter.setYSpeed(-420, -580),
					(this.plsUnburyEmitter = this.game.add.emitter(this.x, this.y, 12)),
					this.plsUnburyEmitter.makeParticles(['zombie_e1', 'zombie_e2']),
					this.game.physics.arcade.enable(this.plsUnburyEmitter),
					(this.plsUnburyEmitter.gravity = this.GAME_GRAVITY),
					this.plsUnburyEmitter.setXSpeed(-100, 100),
					this.plsUnburyEmitter.setYSpeed(-220, -380),
					(this.plsUnburyEmitter.width = 180);
				var e = this.findObjectsByType('zTrap', this.map, 'objectsLayer');
				(this.zTrap = this.add.sprite(e[0].x, e[0].y, 'powerupItem')),
					this.zTrap.anchor.setTo(0.5),
					this.game.physics.arcade.enable(this.zTrap),
					(this.zTrap.body.allowGravity = !1),
					(this.zTrap.activated = !1),
					this.zTrap.scale.setTo(0.8),
					(this.zTrap.originalY = this.zTrap.y),
					(this.zTrapTween = this.game.add.tween(this.zTrap)),
					this.zTrapTween
						.to({ y: this.zTrap.originalY - 5 }, 700)
						.to({ y: this.zTrap.originalY }, 700)
						.loop()
						.start();
				var s = this.findObjectsByType('plsUnbury', this.map, 'objectsLayer');
				(this.unburyGrave = this.add.sprite(s[0].x, s[0].y, 'plsUnbury_spritesheet')),
					this.unburyGrave.anchor.setTo(0.5),
					this.game.physics.arcade.enable(this.unburyGrave),
					(this.unburyGrave.body.allowGravity = !1),
					(this.unburyGrave.body.immovable = !0),
					(this.unburyGrave.damageTaken = 0),
					(this.unburyGrave.previousDamage = 0),
					(this.zElevatorActivated = !1),
					(this.zTrapZombieKillCounter = 0);
			}
			('levelS' != this.currentLevel && 'levelT' != this.currentLevel) ||
				((this.breadCartSpawner = this.findObjectsByType(
					'breadCartSpawner',
					this.map,
					'objectsLayer'
				)),
				this.breadCartsOn(),
				(this.toastSpawners = this.findObjectsByType('toastSpawner', this.map, 'objectsLayer')),
				this.toastSpawn(),
				(this.bagelSpawners = this.findObjectsByType('bagelSpawner', this.map, 'objectsLayer')),
				(this.musicFlipped = !1),
				(this.recordScratchSFX = this.game.add.audio('recordScratchSFX')),
				(this.recordScratchSFX.volume = 0.2),
				this.recordScratchSFX.onStop.addOnce(function () {
					this.levelMusic.stop(),
						(this.levelMusic = this.game.add.audio('breadSmelter')),
						(this.levelMusic.volume = 0.5),
						(this.levelMusic.loop = !0),
						this.levelMusic.play();
				}, this)),
				'levelX' == this.currentLevel &&
					((this.camAnchor = this.add.sprite(
						0.5 * this.game.world.width,
						this.game.world.height - 220,
						'invisPlat25'
					)),
					this.camAnchor.anchor.setTo(0.5)),
				null === localStorage.getItem('DBmaxHP')
					? (this.maxHP = 3)
					: (this.maxHP = localStorage.getItem('DBmaxHP'));
			var i = this.findObjectsByType('player', this.map, 'objectsLayer');
			if (
				((this.player = this.add.sprite(i[0].x, i[0].y, this.characterArray[this.characterIndex])),
				this.player.anchor.setTo(0.5),
				this.game.physics.arcade.enable(this.player),
				(this.player.body.gravity.y = this.GAME_GRAVITY),
				(this.player.customParams = {
					health: this.maxHP,
					maxHealth: this.maxHP,
					mustJump: !1,
					emit: !1,
					facingRight: !0,
					crouching: !1,
					isMovingLeft: !1,
					isMovingRight: !1,
					allowMovement: !0,
					hasHat: !1,
					keyCount: 0,
					hasKey: !1,
					donutCount: 0,
					underwater: !1,
					mobileJumpCheck: !1,
					invincible: !1,
					invincibleTimer: 0,
					secretInvincibility: !1,
					canActivateSwitch: !0,
					fastFallAllowed: !0,
					touchingCrate: !1,
					touchingPress: !1,
					touchingConv: !1,
					disBoiDed: !1,
					hotSauce: !1,
					hotSauceTimer: 0,
					kifliTimer: 0
				}),
				('levelB' != this.currentLevel && 'levelZ' != this.currentLevel) ||
					(this.player.customParams.facingRight = !1),
				(this.player.body.collideWorldBounds = !0),
				this.player.body.setSize(70, 90, 0, 2),
				this.player.customParams.facingRight
					? this.player.scale.setTo(0.5)
					: this.player.scale.setTo(-0.5, 0.5),
				'levelX' != this.currentLevel
					? this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT)
					: this.game.camera.follow(this.camAnchor, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT),
				this.levelData.hat)
			) {
				var a = this.findObjectsByType('hat', this.map, 'objectsLayer');
				(this.hat = this.add.sprite(a[0].x, a[0].y, this.levelData.hat)),
					this.hat.anchor.setTo(0.5),
					this.game.physics.arcade.enable(this.hat),
					this.hat.scale.setTo(0.5),
					(this.hat.angle = 0),
					(this.hat.body.allowGravity = !1);
				var h = this.hat.y;
				(this.lostHatTween = this.game.add.tween(this.hat)),
					this.lostHatTween.to({ angle: '+360' }, 300).loop(),
					(this.hatTween = this.game.add.tween(this.hat)),
					this.hatTween
						.to({ y: h - 5 }, 700)
						.to({ y: h }, 700)
						.loop()
						.start();
			}
			var o = this.findObjectsByType('gold_key', this.map, 'objectsLayer');
			if ('' != o) {
				(this.key = this.add.sprite(o[0].x, o[0].y, 'gold_key')),
					this.key.anchor.setTo(0.5),
					this.game.physics.arcade.enable(this.key),
					this.key.scale.setTo(0.9),
					(this.key.angle = 45),
					(this.key.body.allowGravity = !1);
				var r = this.key.y;
			}
			(this.keyTween = this.game.add.tween(this.key)),
				this.keyTween
					.to({ y: r - 5 }, 700)
					.to({ y: r }, 700)
					.loop()
					.start();
			var l,
				n = this.findObjectsByType('cage', this.map, 'objectsLayer');
			if (
				('' != n &&
					((this.cage = this.add.sprite(n[0].x, n[0].y, 'cage')),
					this.game.physics.arcade.enable(this.cage),
					this.cage.scale.setTo(1),
					(this.cage.body.immovable = !0),
					(this.cage.body.allowGravity = !1),
					(this.cageOpenTween = this.game.add.tween(this.cage.scale)),
					this.cageOpenTween.to({ y: 0 }, 500)),
				(this.totalDonut = 0),
				(this.whiteLabels = []),
				(this.wli = 0),
				(this.clamPearls = this.add.group()),
				(this.toasts = this.add.group()),
				(this.loafs = this.add.group()),
				(this.gunbugBullets = this.add.group()),
				(this.dustBullets = this.add.group()),
				(this.gullDung = this.add.group()),
				(this.uniqueID = 1),
				(this.enemies = this.add.group()),
				(this.enemies2 = this.add.group()),
				(this.enemies3 = this.add.group()),
				(this.enemies6 = this.add.group()),
				(this.enemies7 = this.add.group()),
				(this.enemies8 = this.add.group()),
				(this.enemies9 = this.add.group()),
				(this.enemies10 = this.add.group()),
				(this.enemies11 = this.add.group()),
				(this.enemies12 = this.add.group()),
				(this.enemies13 = this.add.group()),
				(this.enemies14 = this.add.group()),
				(this.enemies15 = this.add.group()),
				(this.allEnemies = [
					this.enemies,
					this.enemies2,
					this.enemies3,
					this.enemies6,
					this.enemies7,
					this.enemies8,
					this.enemies9,
					this.enemies10,
					this.enemies11,
					this.enemies12,
					this.enemies13,
					this.enemies14,
					this.enemies15
				]),
				this.createEnemies(),
				(this.thwomps = this.add.group()),
				this.createThwomps(),
				(this.donuts = this.add.group()),
				this.createDonuts(),
				(this.crates = this.add.group()),
				this.createCrates(),
				(this.hatches = this.add.group()),
				this.createHatches(),
				(this.spikes = this.add.group()),
				this.createSpikes(),
				(this.checkpoints = this.add.group()),
				this.createCheckpoints(),
				(this.breadMakers = this.add.group()),
				this.createBreadMakers(),
				(this.breadCarts = this.add.group()),
				(this.elevators = this.add.group()),
				this.createElevators(),
				(this.chainLifts = this.add.group()),
				this.createChainLifts(),
				(this.fires = this.add.group()),
				this.createFires(),
				(this.buzzsaws = this.add.group()),
				this.createBuzzsaws(),
				(this.realBigFishs = this.add.group()),
				this.createRealBigFishs(),
				(this.zTrapGates = this.add.group()),
				this.createZTrapGates(),
				(this.secretCharacters = this.add.group()),
				this.createSecretCharacters(),
				'levelX' == this.currentLevel &&
					((this.endChars = this.add.group()),
					this.createEndChars(),
					(this.beachBalls = this.add.group())),
				(this.bubbles = this.add.group()),
				(this.healths = this.add.group()),
				this.createHealths(),
				(this.hotSauces = this.add.group()),
				this.createHotSauces(),
				(this.pills = this.add.group()),
				this.createPills(),
				(this.weapons = this.add.group()),
				this.createWeapons(),
				'levelZ' == this.currentLevel && (this.player.body.moves = !1),
				'levelL' == this.currentLevel ||
					'levelM' == this.currentLevel ||
					'levelY' == this.currentLevel)
			) {
				this.bSpawn = this.findObjectsByType('bubbleSpawner', this.map, 'objectsLayer');
				var m = this.findObjectsByType('fakeWater', this.map, 'objectsLayer');
				(this.fakeWater = this.add.sprite(m[0].x, m[0].y, 'fakeWater')),
					this.fakeWater.anchor.setTo(0.5),
					this.game.physics.arcade.enable(this.fakeWater),
					(this.fakeWater.body.allowGravity = !1),
					(this.fakeWater.anim = this.fakeWater.animations.add('fakeWaterAnim', [], 1.325, !0)),
					this.fakeWater.anim.play();
			}
			if (
				'levelO' == this.currentLevel ||
				'levelP' == this.currentLevel ||
				'levelQ' == this.currentLevel ||
				'levelR' == this.currentLevel ||
				'levelAA' == this.currentLevel
			) {
				var c = this.findObjectsByType('graveSecret', this.map, 'objectsLayer');
				(this.graveSecret = this.add.sprite(c[0].x, c[0].y, 'graveSecret')),
					this.game.physics.arcade.enable(this.graveSecret),
					(this.graveSecret.body.allowGravity = !1),
					(this.graveSecret.body.immovable = !0),
					this.graveSecret.anchor.setTo(0.5),
					(this.keySurpriseSpawn = this.findObjectsByType('keySur', this.map, 'objectsLayer')),
					(this.keySurpriseSpawn2 = this.findObjectsByType('keySur2', this.map, 'objectsLayer')),
					(this.keySurpriseSpawn3 = this.findObjectsByType('keySur3', this.map, 'objectsLayer'));
				var d = this.findObjectsByType('unburyGraveGround', this.map, 'objectsLayer');
				(this.unburyGround = this.add.sprite(d[0].x, d[0].y, 'unburyGraveGround')),
					this.game.physics.arcade.enable(this.unburyGround),
					(this.unburyGround.body.allowGravity = !1),
					(this.unburyGround.body.immovable = !0),
					this.unburyGround.anchor.setTo(0.5),
					(this.rockCrumbleSFX = this.game.add.audio('rockCrumbleSFX')),
					(this.rockCrumbleSFX.volume = 0.2),
					(this.rockDestroySFX = this.game.add.audio('rockDestroySFX')),
					(this.rockDestroySFX.volume = 0.2),
					(this.unburyEmit = this.game.add.emitter(this.x, this.y, 12)),
					this.unburyEmit.makeParticles([
						'unburyEmit1',
						'unburyEmit2',
						'unburyEmit3',
						'unburyEmit4'
					]),
					this.game.physics.arcade.enable(this.unburyEmit),
					(this.unburyEmit.gravity = this.GAME_GRAVITY),
					(this.unburyEmit.width = 50),
					(this.unburyEmit.height = 50);
				var p = this.findObjectsByType('puggsyEgg', this.map, 'objectsLayer');
				(this.puggsyEgg = this.add.sprite(p[0].x, p[0].y, '25x25_trans')),
					this.game.physics.arcade.enable(this.puggsyEgg),
					(this.puggsyEgg.timeLastTouched = 0),
					this.puggsyEgg.anchor.setTo(0.5),
					(this.puggsyEgg.ableToActivate = !0);
			}
			if ('levelS' == this.currentLevel || 'levelT' == this.currentLevel) {
				(this.bagels = this.add.group()), (this.indianaRolls = this.add.group());
				var y = this.findObjectsByType('indianaRoll', this.map, 'objectsLayer');
				(this.indianaRoll = new FaceGame.IndianaRoll(
					this.game,
					y[0].x,
					y[0].y,
					'indianaRoll',
					this.map,
					this.player
				)),
					this.indianaRolls.add(this.indianaRoll);
				var u = this.findObjectsByType('hideIndiana', this.map, 'objectsLayer');
				(this.hideIndiana = this.add.sprite(u[0].x, u[0].y, 'hideIndiana')),
					this.hideIndiana.anchor.setTo(0.5),
					(this.ceilingCrash2SFX = this.game.add.audio('ceilingCrash2SFX')),
					(this.ceilingCrash2SFX.volume = 0.4),
					(this.hideIndianaEmit = this.game.add.emitter(this.x, this.y, 80)),
					this.hideIndianaEmit.makeParticles(['hideIndianaEmit1', 'hideIndianaEmit3']),
					this.game.physics.arcade.enable(this.hideIndianaEmit),
					(this.hideIndianaEmit.gravity = this.GAME_GRAVITY),
					this.hideIndianaEmit.setXSpeed(-60, 60),
					this.hideIndianaEmit.setYSpeed(200, 400),
					(this.hideIndianaEmit.minParticleScale = 0.5),
					(this.hideIndianaEmit.maxParticleScale = 0.8),
					(this.hideIndianaEmit.width = 275),
					(this.hideIndianaEmit.height = 250),
					this.hideIndianaEmit.bounce.setTo(0.4, 0.4);
			}
			if ('levelW' == this.currentLevel) {
				const t = [
					{ x: 225, y: 950, text: 'Move with ← and →' },
					{ x: 830, y: 950, text: 'Jump with ↑' },
					{ x: 1400, y: 950, text: 'You can double jump' },
					{ x: 2425, y: 625, text: 'Shoot with Z' },
					{ x: 2950, y: 625, text: 'Or jump on enemies' },
					{ x: 4125, y: 715, text: 'Crouch with ↓' },
					{ x: 4825, y: 725, text: 'Fast fall with ↓\nwhile in the air' },
					{ x: 5350, y: 975, text: 'Swimming is fun' },
					{ x: 5555, y: 1225, text: 'Donut Boy can hold his breath forever' },
					{ x: 6e3, y: 1100, text: 'Stand on me' },
					{ x: 7675, y: 575, text: "Safety Cap prevents damage\nDon't let it get away!" },
					{ x: 9875, y: 800, text: 'Cycle through weapons with X' },
					{ x: 9350, y: 1225, text: 'Cycle through characters with C' },
					{ x: 5625, y: 125, text: 'Cycle through characters with C' },
					{
						x: 10175,
						y: 350,
						text: 'Pause with Enter to review controls\nor change weapons/characters'
					},
					{ x: 11e3, y: 625, text: 'Have fun :)' }
				];
				for (var g = 0; g < t.length; g++)
					(this.tutLabel = this.game.add.text(t[g].x, t[g].y, t[g].text, {
						font: '20px Geo',
						fill: '#fff'
					})),
						(this.tutLabel.stroke = '#000000'),
						(this.tutLabel.strokeThickness = 2),
						this.tutLabel.anchor.setTo(0.5);
			}
			if (
				('levelX' == this.currentLevel &&
					((this.creditsLabel = this.game.add.text(
						0.5 * this.game.camera.width,
						this.game.camera.height,
						'Damon done gone and made this game\n\nProgramming\nDamon\n\nSex Appeal\nDamon\n\nOriginal Erotic Content\nDamon\n\nMusic\nHans Zimmer',
						{ font: '20px Geo', fill: '#fff' }
					)),
					(this.creditsLabel.stroke = '#000000'),
					(this.creditsLabel.strokeThickness = 2),
					this.creditsLabel.anchor.setTo(0.5, 0),
					(this.creditsLabel.fixedToCamera = !0),
					(this.yMod = 0),
					(this.creditsDone = !1),
					(this.yModFast = !1)),
				(this.staticFGLayer = this.map.createLayer('staticFGLayer')),
				'levelW' == this.currentLevel)
			) {
				var b = this.findObjectsByType('fakeSand', this.map, 'objectsLayer');
				(this.fakeSand = this.add.sprite(b[0].x, b[0].y, 'fakeSand')),
					this.game.physics.arcade.enable(this.fakeSand),
					(this.fakeSand.body.allowGravity = !1),
					(this.fakeSand.body.immovable = !0),
					this.fakeSand.anchor.setTo(0.5),
					(this.rockCrumbleSFX = this.game.add.audio('rockCrumbleSFX')),
					(this.rockCrumbleSFX.volume = 0.2),
					(this.rockDestroySFX = this.game.add.audio('rockDestroySFX')),
					(this.rockDestroySFX.volume = 0.2),
					(this.fakeSandEmit = this.game.add.emitter(this.fakeSand.x, this.fakeSand.y, 32)),
					this.fakeSandEmit.makeParticles([
						'unburyEmit1',
						'unburyEmit2',
						'unburyEmit3',
						'unburyEmit4'
					]),
					this.game.physics.arcade.enable(this.fakeSandEmit),
					(this.fakeSandEmit.gravity = this.GAME_GRAVITY),
					(this.fakeSandEmit.width = 50),
					(this.fakeSandEmit.height = 350);
			}
			((this.characterLabel = this.game.add.text(this.player.x, this.player.y + 40, '', {
				font: '18px Geo',
				fill: '#fff',
				align: 'center'
			})),
			this.characterLabel.anchor.setTo(0.5),
			(this.characterLabel.stroke = '#000000'),
			(this.characterLabel.strokeThickness = 2),
			(this.characterLabel.timer = 0),
			(this.characterLabel.alpha = 0),
			'levelT' == this.currentLevel &&
				((this.parallaxFGLayer = this.map.createLayer('parallaxFGLayer')),
				(this.parallaxFGLayer.scrollFactorX = 1.4),
				(this.parallaxFGLayer.scrollFactorY = 0.9)),
			'levelAA' == this.currentLevel) &&
				((this.graveGhosts = this.add.group()),
				this.findObjectsByType('graveGhost', this.map, 'objectsLayer').forEach(function (t) {
					(l = new FaceGame.GraveGhost(this.game, -950, -25, this.player)), this.graveGhosts.add(l);
				}, this));
		},
		openingText: function (t) {
			var e = t;
			if (t > 0) {
				var s, i;
				this.speak.play(),
					(this.goal.body.velocity.y = -70),
					this.game.time.events.add(300, function () {
						FaceGame.GameState.goal.body.velocity.y = -70;
					}),
					1 == t
						? ((s = 'Sweet Jesus, Donut Boy!'), (i = -200))
						: 2 == t
						? ((s = 'There has been an accident!'), (i = -170))
						: 3 == t
						? ((s = 'Our donut making machine has exploded,'), (i = -110))
						: 4 == t
						? ((s = 'expelling our employees and donuts throughout town.'), (i = -80))
						: 5 == t &&
						  ((s = 'Can you save them and become Donut Man?'),
						  (i = -20),
						  (this.openingEnterLabel.text = 'Press Enter to start'));
				var a = 'openingLabel' + t;
				(this[a] = this.add.text(this.camera.width / 2, this.camera.height / 2 + i, s, {
					font: '20px Geo',
					fill: '#fff'
				})),
					this[a].anchor.setTo(0.5),
					(this[a].fixedToCamera = !0),
					(this[a].stroke = '#000000'),
					(this[a].strokeThickness = 2);
			}
			if (++e < 6) {
				var h = 2400;
				1 == e && (h = 650),
					this.game.time.events.add(h, function () {
						FaceGame.GameState.openingText(e);
					});
			}
		},
		displayEndCreditsStats: function () {
			(this.statsTitleLabel = this.game.add.text(
				0.5 * this.game.world.width,
				this.game.world.height - 330,
				'End Game Stats',
				{ font: '25px VT323', fill: '#fff' }
			)),
				this.statsTitleLabel.anchor.setTo(0.5),
				(this.statsTitleLabel.stroke = '#000000'),
				(this.statsTitleLabel.strokeThickness = 2);
			for (var t = 50, e = 1; e < 6; e++) {
				var s = 'lvl' + e + 'label',
					i = 'lvl' + e + 'dIcon',
					a = 'lvl' + e + 'dLabel',
					h = 'lvl' + e + 'cIcon',
					o = 'lvl' + e + 'cLabel',
					r = 'lvl' + e + 'wIcon',
					l = 'lvl' + e + 'wLabel',
					n = 'level' + e + 'got',
					m = 'level' + e + 'max',
					c = 'lvl' + e + 'dedIcon',
					d = 'lvl' + e + 'dedLabel',
					p = 'level' + e;
				(this[s] = this.game.add.text(
					this.game.camera.x + t,
					this.game.world.height - 275,
					'Level ' + e,
					{ font: '25px VT323', fill: '#fff' }
				)),
					this[s].anchor.setTo(0, 0.5),
					(this[s].stroke = '#000000'),
					(this[s].strokeThickness = 2),
					(this[i] = this.add.sprite(
						this.game.camera.x + t,
						this.game.world.height - 235,
						'donut1'
					)),
					this[i].anchor.setTo(1, 0.5),
					this[i].scale.setTo(0.3, 0.3),
					(this[a] = this.game.add.text(
						this[i].x,
						this[i].y,
						': ' + this.donutTracker[n] + '/' + this.donutTracker[m],
						{ font: '25px VT323', fill: '#fff' }
					)),
					this[a].anchor.setTo(0, 0.5),
					(this[a].stroke = '#000000'),
					(this[a].strokeThickness = 2),
					this.donutTracker[n] >= this.donutTracker[m] && this[a].addColor('#ffd700', 2),
					(this[h] = this.add.sprite(
						this.game.camera.x + t,
						this.game.world.height - 205,
						'statsChar'
					)),
					this[h].anchor.setTo(1, 0.5),
					this[h].scale.setTo(0.3, 0.3),
					(this[o] = this.game.add.text(
						this[h].x,
						this[h].y,
						': ' + this.charTracker[n].length + '/' + this.charTracker[m],
						{ font: '25px VT323', fill: '#fff' }
					)),
					this[o].anchor.setTo(0, 0.5),
					(this[o].stroke = '#000000'),
					(this[o].strokeThickness = 2),
					this.charTracker[n].length >= this.charTracker[m] && this[o].addColor('#ffd700', 2),
					(this[r] = this.add.sprite(
						this.game.camera.x + t,
						this.game.world.height - 170,
						'powerupItem'
					)),
					this[r].anchor.setTo(1, 0.5),
					this[r].scale.setTo(0.35, 0.35),
					(this[l] = this.game.add.text(
						this[r].x,
						this[r].y,
						': ' + this.weaponTracker[n].length + '/' + this.weaponTracker[m],
						{ font: '25px VT323', fill: '#fff' }
					)),
					this[l].anchor.setTo(0, 0.5),
					(this[l].stroke = '#000000'),
					(this[l].strokeThickness = 2),
					this.weaponTracker[n].length >= this.weaponTracker[m] && this[l].addColor('#ffd700', 2),
					(this[c] = this.add.sprite(
						this.game.camera.x + t,
						this.game.world.height - 130,
						'skull'
					)),
					this[c].anchor.setTo(1, 0.5),
					this[c].scale.setTo(0.5, 0.5),
					(this[d] = this.game.add.text(this[c].x, this[c].y, ' ' + this.deathTracker[p], {
						font: '25px VT323',
						fill: '#fff'
					})),
					this[d].anchor.setTo(0, 0.5),
					(this[d].stroke = '#000000'),
					(this[d].strokeThickness = 2),
					(t += 132);
			}
		},
		destroyOverlay: function () {
			(this.overlayActive = !1),
				(this.player.body.moves = !0),
				this.panel.destroy(),
				this.missionLabel1.destroy(),
				this.missionLabel2.destroy(),
				this.missionLabel3.destroy(),
				this.missionLabel4.destroy(),
				this.fakeGoal.destroy(),
				this.levelMusic.play(),
				this.pauseGame();
		},
		activateIndiana: function () {
			(this.hideIndianaEmit.x = this.hideIndiana.x),
				(this.hideIndianaEmit.y = this.hideIndiana.y),
				this.hideIndianaEmit.start(!0, 2e3, null, 80),
				this.hideIndiana.kill(),
				this.ceilingCrash2SFX.play();
		},
		resetIndiana: function () {
			this.indianaRolls.children[0].reset(
				this.indianaRolls.children[0].customParams.originalX,
				this.indianaRolls.children[0].customParams.originalY
			),
				(this.indianaRolls.children[0].customParams.touchDownTimer = 0),
				(this.indianaRolls.children[0].customParams.moving = !1),
				(this.indianaRolls.children[0].customParams.topSpeed = !1),
				(this.indianaRolls.children[0].customParams.activated = !1),
				(this.indianaRolls.children[0].customParams.hitTheWall = !1),
				(this.indianaRolls.children[0].customParams.endOfStuff = !1),
				(this.indianaRolls.children[0].body.velocity.x = 0),
				(this.indianaRolls.children[0].body.gravity.y = 0),
				this.indianaRolls.children[0].rollingSFX.isPlaying &&
					this.indianaRolls.children[0].rollingSFX.stop(),
				this.hideIndiana.reset(this.hideIndiana.x, this.hideIndiana.y);
			for (var t = 0; t < this.crates.children.length; t++)
				this.crates.children[t].resetIndiana &&
					(this.crates.children[t].reset(
						this.crates.children[t].customParams.originalX,
						this.crates.children[t].customParams.originalY
					),
					(this.crates.children[t].health = 3));
			for (t = 0; t < this.platformsFalling.children.length; t++)
				this.platformsFalling.children[t].reset(
					this.platformsFalling.children[t].customParams.originalX,
					this.platformsFalling.children[t].customParams.originalY
				),
					(this.platformsFalling.children[t].health = 3),
					this.platformsFalling.children[t].resetThePlat();
			for (t = 0; t < this.doors.children.length; t++)
				this.doors.children[t].resetIndiana &&
					(this.doors.children[t].reset(
						this.doors.children[t].customParams.originalX,
						this.doors.children[t].customParams.originalY
					),
					(this.doors.children[t].health = 3),
					(this.doors.children[t].customParams.open =
						this.doors.children[t].customParams.originalOpen));
			for (t = 0; t < this.newSwitches.children.length; t++)
				this.newSwitches.children[t].resetIndiana &&
					this.newSwitches.children[t].customParams.broken &&
					((this.newSwitches.children[t].customParams.broken = !1),
					(this.newSwitches.children[t].frame = 0));
			for (t = 0; t < this.buttons.children.length; t++)
				this.buttons.children[t].resetIndiana &&
					this.buttons.children[t].customParams.moveNoMore &&
					((this.buttons.children[t].customParams.moveNoMore = !1),
					(this.buttons.children[t].y = this.buttons.children[t].customParams.originalY));
		},
		indianaRollCrushCrate: function (t, e) {
			e.damage(100, 'shoot', 'right');
		},
		indianaRollCrushPlayer: function (t, e) {
			this.gameOver();
		},
		bagelSpawn: function () {
			this.bouncingBagelTimer = this.game.time.events.loop(
				3.5 * Phaser.Timer.SECOND,
				function () {
					this.spawnBouncingBagels(this.bagelSpawners[0]);
				},
				this
			);
		},
		spawnBouncingBagels: function (t) {
			if (Math.abs(t.x - this.player.x) < 2500 && Math.abs(t.x - this.player.x) > 200) {
				var e = 12 * Math.random() * (t.x - this.player.x > 0 ? -1 : 1),
					s = String(Math.round(1 + 2 * Math.random())),
					i = t.x - this.player.x > 0 ? -100 : 100,
					a = this.bagels.getFirstExists(!1);
				a
					? (a.reset(t.x, t.y), (a.body.velocity.x = i), (a.spinSpeed = e))
					: ((a = new FaceGame.Bagel(this.game, t.x, t.y, e, i, 'cRoll' + s)), this.bagels.add(a));
			}
		},
		toastSpawn: function () {
			(this.fallingToastTimer = this.game.time.events.loop(
				3 * Phaser.Timer.SECOND,
				function () {
					this.spawnFallingToast(this.toastSpawners[0]);
				},
				this
			)),
				(this.fallingToastTimer3 = this.game.time.events.loop(
					2 * Phaser.Timer.SECOND,
					function () {
						this.spawnFallingToast(this.toastSpawners[2]);
					},
					this
				)),
				(this.fallingToastTimer2 = this.game.time.events.loop(
					3 * Phaser.Timer.SECOND,
					function () {
						this.spawnFallingToast(this.toastSpawners[1]);
					},
					this
				));
		},
		spawnFallingToast: function (t) {
			if (Math.abs(t.x - this.player.x) < 500)
				for (var e = 0; e < 8; e++) {
					var s = 40 * Math.random() * (Math.random() < 0.5 ? 1 : -1),
						i = 250 * Math.random() * (Math.random() < 0.5 ? 1 : -1),
						a = 12 * Math.random() * (Math.random() < 0.5 ? 1 : -1),
						h = String(Math.round(1 + 2 * Math.random())),
						o = this.toasts.getFirstExists(!1);
					o
						? (o.reset(t.x + s, t.y + i), (o.body.velocity.x = 0), o.loadTexture('gKnot' + h))
						: (((o = new FaceGame.Toast(
								this.game,
								t.x + s,
								t.y + i,
								a,
								'gKnot' + h
						  )).body.velocity.x = 0),
						  this.toasts.add(o));
				}
		},
		breadCartsOn: function () {
			(this.breadCartTimer = this.game.time.events.loop(
				2.8 * Phaser.Timer.SECOND,
				function () {
					this.spawnBreadCarts(this.breadCartSpawner[0], -1);
				},
				this
			)),
				(this.breadCartTimer = this.game.time.events.loop(
					3.5 * Phaser.Timer.SECOND,
					function () {
						this.spawnBreadCarts(this.breadCartSpawner[1], 1);
					},
					this
				));
		},
		spawnBreadCarts: function (t, e) {
			var s = this.breadCarts.getFirstExists(!1);
			s
				? (s.reset(t.x, t.y), (s.body.velocity.x = 120 * e))
				: ((s = new FaceGame.BreadCart(this.game, t.x, t.y, this.map, this.player, e)).addChild(
						this.game.make.sprite(0, -56.5, 'breadCartButts')
				  ),
				  s.children[0].anchor.setTo(0.5),
				  this.breadCarts.add(s));
		},
		bubblesOnOff: function (t) {
			t
				? (this.bubbleTimer = this.game.time.events.loop(
						0.65 * Phaser.Timer.SECOND,
						this.spawnTheBubbles,
						this
				  ))
				: this.game.time.events.remove(this.bubbleTimer);
		},
		spawnTheBubbles: function () {
			var t = this.bubbles.getFirstExists(!1),
				e = 260 * Math.random() * (Math.random() < 0.5 ? 1 : -1),
				s = 40 * Math.random() * (Math.random() < 0.5 ? 1 : -1);
			t
				? t.reset(this.bSpawn[0].x + e, this.bSpawn[0].y + s)
				: ((t = new FaceGame.Bubble(
						this.game,
						this.bSpawn[0].x + e,
						this.bSpawn[0].y + s,
						'bubble',
						null,
						this.map,
						this.player
				  )),
				  this.bubbles.add(t));
		},
		beginNewOverlay: function () {
			(this.overlayActive = !0),
				(this.player.body.moves = !1),
				(this.overlay = this.add.bitmapData(this.camera.width, this.camera.height)),
				(this.overlay.ctx.fillStyle = '#000'),
				this.overlay.ctx.fillRect(0, 0, this.camera.width, this.camera.height),
				(this.panel = this.add.sprite(0, 0, this.overlay)),
				this.panel.anchor.setTo(0, 0),
				(this.panel.fixedToCamera = !0),
				(this.missionLabel1 = this.game.add.text(
					this.camera.width / 2,
					this.camera.height / 2 - 80,
					'Level ' + this.levelData.number,
					{ font: '20px Russo One', fill: '#fff' }
				)),
				this.missionLabel1.anchor.setTo(0.5),
				(this.missionLabel1.fixedToCamera = !0),
				'levelT' == this.currentLevel && (this.missionLabel1.text = 'Final Level'),
				(this.missionLabel2 = this.game.add.text(
					this.camera.width / 2,
					this.camera.height / 2 - 50,
					this.levelData.title,
					{ font: '30px Russo One', fill: '#fff' }
				)),
				this.missionLabel2.anchor.setTo(0.5),
				(this.missionLabel2.fixedToCamera = !0),
				(this.missionLabel3 = this.game.add.text(
					this.camera.width / 2 - 41,
					this.camera.height / 2 + 20,
					'Rescue ' +
						this.levelData.goalFace.charAt(0).toUpperCase() +
						this.levelData.goalFace.slice(1),
					{ font: '20px Russo One', fill: '#fff' }
				)),
				this.missionLabel3.anchor.setTo(0.5),
				(this.missionLabel3.fixedToCamera = !0),
				(this.fakeGoal = this.add.sprite(
					this.missionLabel3.x + 0.5 * this.missionLabel3.width + 40,
					this.missionLabel3.y - 5,
					this.levelData.goalFace
				)),
				this.fakeGoal.anchor.setTo(0.5),
				this.fakeGoal.scale.setTo(-0.5, 0.5),
				(this.fakeGoal.fixedToCamera = !0),
				(this.missionLabel4 = this.game.add.text(
					this.camera.width / 2,
					this.camera.height / 2 + 120,
					'Press Enter to Start',
					{ font: '13px Russo One', fill: '#fff' }
				)),
				this.missionLabel4.anchor.setTo(0.5),
				(this.missionLabel4.fixedToCamera = !0),
				this.enter.onDown.addOnce(function () {
					this.overlayActive && this.destroyOverlay();
				}, this),
				this.esc.onDown.addOnce(function () {
					this.overlayActive && this.destroyOverlay();
				}, this);
		},
		beginOverlay: function () {
			var t;
			(this.player.customParams.allowMovement = !1),
				(this.overlay = this.add.bitmapData(this.game.width, this.game.height)),
				(this.overlay.ctx.fillStyle = '#000'),
				this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height),
				(this.panel = this.add.sprite(0, 0, this.overlay)),
				this.panel.anchor.setTo(0, 0),
				(this.panel.fixedToCamera = !0),
				(this.star = this.add.sprite(40, 10, 'freedomStar')),
				(this.star.fixedToCamera = !0),
				this.star.scale.setTo(0.4),
				(this.star.alpha = 0),
				'levelC' == this.currentLevel &&
					(setTimeout(
						function () {
							this.star.alpha = 1;
						}.bind(this),
						6e3
					),
					setTimeout(
						function () {
							this.star.alpha = 0;
						}.bind(this),
						6250
					)),
				'levelA' == this.currentLevel
					? ((line0 = 'MISSION ONE'), (t = 'RESCUE AMERICAN WAR COMRADE SAMSKA'), '')
					: 'levelB' == this.currentLevel
					? ((line0 = 'MISSION 2'), (t = 'DELIVER HOME COMRADE ZAKOV'), '')
					: 'levelC' == this.currentLevel
					? ((line0 = 'MISSION THREE'), (t = 'MAKE SMOOCH WITH COMRADE KYELKA'), '')
					: ((line0 = 'MISSION FOUR'), (t = ''), '');
			var e = { font: '30px Russo One', fill: '#FFF' },
				s = this.add.text(this.game.width / 2, this.game.height / 2 - 50, line0, e);
			s.anchor.setTo(0.5),
				(s.fixedToCamera = !0),
				(e = { font: '20px Russo One', fill: '#FED530' });
			var i = this.add.text(this.game.width / 2, this.game.height / 2 + 20, t, e);
			i.anchor.setTo(0.5), (i.fixedToCamera = !0);
			var a = this.add.text(this.game.width / 2, this.game.height / 2 + 50, '', e);
			a.anchor.setTo(0.5),
				(a.fixedToCamera = !0),
				(e = { font: '10px Russo One', fill: '#FED530' });
			var h = this.add.text(
				this.game.width / 2,
				this.game.height / 2 + 90,
				"Press 'z' to commence",
				e
			);
			h.anchor.setTo(0.5),
				(h.fixedToCamera = !0),
				this.z.onDown.addOnce(function () {
					(this.player.customParams.allowMovement = !0),
						this.panel.kill(),
						this.star.kill(),
						s.destroy(),
						i.destroy(),
						a.destroy(),
						h.destroy(),
						this.levelMusic.play();
				}, this);
		},
		beginIntro: function () {
			(this.meetTom = this.game.add.audio('meetTom')),
				(this.meetTom.volume = 1),
				(this.speak = this.game.add.audio('speak')),
				(this.speak.volume = 0.2),
				(this.badSpeak = this.game.add.audio('badSpeak')),
				(this.badSpeak.volume = 0.2),
				(this.player.customParams.allowMovement = !1),
				this.meetTom.play(),
				(this.overlay0 = this.add.bitmapData(this.game.width, this.game.height)),
				(this.overlay0.ctx.fillStyle = '#b9aee5'),
				this.overlay0.ctx.fillRect(0, 0, this.game.width, this.game.height),
				(this.panel0 = this.add.sprite(0, 0, this.overlay0)),
				this.panel0.anchor.setTo(0, 0),
				(this.panel0.fixedToCamera = !0),
				(this.tom = this.add.sprite(80, 60, 'tom')),
				this.tom.anchor.setTo(0.5, 0.5),
				(this.tom.fixedToCamera = !0),
				(this.fakePlayer = this.add.sprite(this.game.width - 80, this.game.height - 60, 'player')),
				this.fakePlayer.anchor.setTo(0.5, 0.5),
				this.fakePlayer.scale.setTo(-0.75, 0.75),
				(this.fakePlayer.fixedToCamera = !0);
			var t,
				e,
				s,
				i,
				a,
				h,
				o = this.game.add.tween(this.tom);
			o.to({ angle: 15 }, 150).to({ angle: 0 }, 150).to({ angle: 15 }, 150).to({ angle: 0 }, 150),
				(t = 'Hello fellow American war partner.'),
				(e = 'I am your American war general, Юлиан.'),
				(s = 'I am sending you to missions to rescue fellow'),
				(i = 'American war buddies from evil Soviets.'),
				(a = 'Please for to not being suspicious of me.'),
				(h = 'Goodluck fellow american War partner.');
			var r = { font: '20px Russo One', fill: '#000' },
				l = this.add.text(this.game.width / 2, this.game.height / 2 - 120, t, r);
			l.anchor.setTo(0.5), (l.fixedToCamera = !0), (l.alpha = 0);
			var n = this.add.text(this.game.width / 2, this.game.height / 2 - 95, e, r);
			n.anchor.setTo(0.5), (n.fixedToCamera = !0), (n.alpha = 0);
			var m = this.add.text(this.game.width / 2, this.game.height / 2 - 45, s, r);
			m.anchor.setTo(0.5), (m.fixedToCamera = !0), (m.alpha = 0);
			var c = this.add.text(this.game.width / 2, this.game.height / 2 - 20, i, r);
			c.anchor.setTo(0.5), (c.fixedToCamera = !0), (c.alpha = 0);
			var d = this.add.text(this.game.width / 2, this.game.height / 2 + 30, a, r);
			d.anchor.setTo(0.5), (d.fixedToCamera = !0), (d.alpha = 0);
			var p = this.add.text(this.game.width / 2, this.game.height / 2 + 80, h, r);
			p.anchor.setTo(0.5),
				(p.fixedToCamera = !0),
				(p.alpha = 0),
				setTimeout(
					function () {
						(l.alpha = 1), o.start(), this.speak.play();
					}.bind(this),
					500
				),
				setTimeout(
					function () {
						(n.alpha = 1), o.start(), this.speak.play();
					}.bind(this),
					2e3
				),
				setTimeout(
					function () {
						(m.alpha = 1), o.start(), this.speak.play();
					}.bind(this),
					5e3
				),
				setTimeout(
					function () {
						(c.alpha = 1), o.start(), this.speak.play();
					}.bind(this),
					6500
				),
				setTimeout(
					function () {
						(d.alpha = 1), o.start(), this.badSpeak.play();
					}.bind(this),
					9500
				),
				setTimeout(
					function () {
						(p.alpha = 1), o.start(), this.speak.play();
					}.bind(this),
					12500
				),
				this.z.onDown.addOnce(function () {
					this.panel0.kill(),
						l.destroy(),
						n.destroy(),
						m.destroy(),
						c.destroy(),
						d.destroy(),
						p.destroy(),
						this.tom.kill(),
						this.fakePlayer.kill(),
						this.meetTom.stop(),
						(this.speak.volume = 0),
						(this.badSpeak.volume = 0),
						this.beginOverlay();
				}, this);
		},
		movePlayer: function () {
			if (
				(this.player.scale.setTo(this.player.scale.x, 0.5),
				this.player.anchor.setTo(0.5),
				this.player.customParams.isMovingRight
					? ((this.player.body.velocity.x = this.RUNNING_SPEED), this.player.scale.setTo(0.5, 0.5))
					: this.player.customParams.isMovingLeft &&
					  ((this.player.body.velocity.x = -this.RUNNING_SPEED),
					  this.player.scale.setTo(0.5, 0.5)),
				this.cursors.left.isDown || this.player.customParams.isMovingLeft
					? ((this.player.customParams.facingRight = !1),
					  this.player.customParams.hotSauce
							? (this.player.body.velocity.x > 0 + this.CONV_MOD
									? (this.player.body.velocity.x -= 1.5 * this.DEC)
									: this.player.body.velocity.x > -85 + this.CONV_MOD
									? (this.player.body.velocity.x -= 1.5 * this.ACC)
									: this.player.body.velocity.x <= -85 + this.CONV_MOD &&
									  (this.player.body.velocity.x -= 3 * this.ACC),
							  this.player.body.velocity.x <= 1.5 * (-this.RUNNING_SPEED + this.CONV_MOD) &&
									(this.player.body.velocity.x = 1.5 * -(this.RUNNING_SPEED + this.CONV_MOD)))
							: (this.player.body.velocity.x > 0 + this.CONV_MOD
									? (this.player.body.velocity.x -= this.DEC)
									: this.player.body.velocity.x > -85 + this.CONV_MOD
									? (this.player.body.velocity.x -= this.ACC)
									: this.player.body.velocity.x <= -85 + this.CONV_MOD &&
									  (this.player.body.velocity.x -= 2 * this.ACC),
							  this.player.body.velocity.x <= -this.RUNNING_SPEED + this.CONV_MOD &&
									(this.player.body.velocity.x = -this.RUNNING_SPEED + this.CONV_MOD)),
					  this.player.scale.setTo(-0.5, 0.5))
					: (this.cursors.right.isDown || this.player.customParams.isMovingRight) &&
					  ((this.player.customParams.facingRight = !0),
					  this.player.customParams.hotSauce
							? (this.player.body.velocity.x < 0 + this.CONV_MOD
									? (this.player.body.velocity.x += 1.5 * this.DEC)
									: this.player.body.velocity.x < 170 + this.CONV_MOD
									? (this.player.body.velocity.x += 1.5 * this.ACC)
									: this.player.body.velocity.x >= 170 + this.CONV_MOD &&
									  (this.player.body.velocity.x += 3 * this.ACC),
							  this.player.body.velocity.x >= 1.5 * (this.RUNNING_SPEED + this.CONV_MOD) &&
									(this.player.body.velocity.x = 1.5 * (this.RUNNING_SPEED + this.CONV_MOD)))
							: (this.player.body.velocity.x < 0 + this.CONV_MOD
									? (this.player.body.velocity.x += this.DEC)
									: this.player.body.velocity.x < 85 + this.CONV_MOD
									? (this.player.body.velocity.x += this.ACC)
									: this.player.body.velocity.x >= 85 + this.CONV_MOD &&
									  (this.player.body.velocity.x += 2 * this.ACC),
							  this.player.body.velocity.x >= this.RUNNING_SPEED + this.CONV_MOD &&
									(this.player.body.velocity.x = this.RUNNING_SPEED + this.CONV_MOD)),
					  this.player.scale.setTo(0.5, 0.5)),
				this.cursors.right.isUp &&
					this.cursors.left.isUp &&
					(Math.abs(this.player.body.velocity.x) < this.FRICTION + this.CONV_MOD &&
						(this.player.body.velocity.x = 0 + this.CONV_MOD),
					this.player.body.velocity.x > 0 + this.CONV_MOD
						? (this.player.body.velocity.x -= this.FRICTION)
						: this.player.body.velocity.x < 0 + this.CONV_MOD &&
						  (this.player.body.velocity.x += this.FRICTION)),
				this.cursors.down.isDown &&
				(this.player.body.blocked.down || this.player.body.touching.down)
					? (this.player.customParams.crouching = !0)
					: this.player.customParams.crouching &&
					  this.cursors.down.isUp &&
					  (this.player.customParams.crouching, this.managePlayerVelocities()),
				this.player.customParams.crouching &&
					(this.player.scale.setTo(this.player.scale.x, 0.25),
					this.player.anchor.setTo(0.5, 0),
					this.managePlayerVelocities()),
				this.player.customParams.crouching)
			) {
				var t = this.player.x + 1 * (0.5 * Math.abs(this.player.width) - 8),
					e = this.player.x + -1 * (0.5 * Math.abs(this.player.width) - 8),
					s = this.player.y - 0.5 * this.player.height,
					i = this.map.getTileWorldXY(
						t,
						s,
						this.map.tileWidth,
						this.map.tileHeight,
						'collisionLayer'
					),
					a = this.map.getTileWorldXY(
						e,
						s,
						this.map.tileWidth,
						this.map.tileHeight,
						'collisionLayer'
					);
				this.player.customParams.crouching &&
				(this.player.body.blocked.down || this.player.body.touching.down) &&
				this.cursors.down.isUp &&
				(i || a)
					? (this.player.customParams.crouching = !0)
					: !this.cursors.down.isUp || i || a || (this.player.customParams.crouching = !1);
			}
			this.cursors.down.onDown.add(function () {
				this.player.customParams.fastFallAllowed &&
					this.player.body.velocity.y < this.FASTFALL &&
					((this.player.body.velocity.y = this.FASTFALL),
					(this.player.customParams.fastFallAllowed = !1));
			}, this),
				this.cursors.down.onUp.add(function () {
					this.player.customParams.fastFallAllowed = !0;
				}, this),
				this.player.body.moves && this.cursors.up.onDown.add(this.playerJump, this),
				(this.player.body.blocked.down || this.player.body.touching.down) &&
					((this.jumpCount = 0), (this.player.customParams.mobileJumpCheck = !1)),
				this.player.customParams.mustJump ||
					(this.cursors.up.isUp &&
						this.player.body.velocity.y < -85 &&
						this.jumpCount > 0 &&
						(this.player.body.velocity.y = -85)),
				this.player.body.moves &&
					(this.pauseConfirm ||
						(this.cursors.down.onDown.add(this.pauseMenuMove, this, 0, 'down'),
						this.cursors.up.onDown.add(this.pauseMenuMove, this, 0, 'up'),
						this.cursors.right.onDown.add(this.menuChangeMaster, this, 0, 'right'),
						this.cursors.left.onDown.add(this.menuChangeMaster, this, 0, 'left')));
		},
		menuChangeMaster: function (t, e) {
			this.pauseConfirm
				? ('right' == e &&
						0 == this.pauseConfirmOption &&
						((this.pauseConfirmOption = 1),
						this.yeaLabel.addColor('#fff', 0),
						this.naLabel.addColor('#ffd700', 0)),
				  'left' == e &&
						1 == this.pauseConfirmOption &&
						((this.pauseConfirmOption = 0),
						this.yeaLabel.addColor('#ffd700', 0),
						this.naLabel.addColor('#fff', 0)))
				: 1 == this.selectedPauseOption
				? this.changeWeaponPaused(this, e)
				: 2 == this.selectedPauseOption && this.changeCharacterPaused(this, e);
		},
		pauseMenuMove: function (t, e) {
			this.game.paused &&
				!this.pauseConfirm &&
				('up' == e ? this.selectedPauseOption-- : this.selectedPauseOption++,
				this.selectedPauseOption > 3 && (this.selectedPauseOption = 0),
				this.selectedPauseOption < 0 && (this.selectedPauseOption = 3),
				this.changePauseOption(this.selectedPauseOption));
		},
		changePauseOption: function (t) {
			0 == t
				? (this.resumeGameLabel.addColor('#ffd700', 0),
				  this.weaponControlLabel.addColor('#fff', 7),
				  this.charControlLabel.addColor('#fff', 11),
				  this.returnToTitleLabel.addColor('#fff', 0))
				: 1 == t
				? (this.resumeGameLabel.addColor('#fff', 0),
				  this.weaponControlLabel.addColor('#ffd700', 7),
				  this.charControlLabel.addColor('#fff', 11),
				  this.returnToTitleLabel.addColor('#fff', 0))
				: 2 == t
				? (this.resumeGameLabel.addColor('#fff', 0),
				  this.weaponControlLabel.addColor('#fff', 7),
				  this.charControlLabel.addColor('#ffd700', 11),
				  this.returnToTitleLabel.addColor('#fff', 0))
				: 3 == t &&
				  (this.resumeGameLabel.addColor('#fff', 0),
				  this.weaponControlLabel.addColor('#fff', 7),
				  this.charControlLabel.addColor('#fff', 11),
				  this.returnToTitleLabel.addColor('#ffd700', 0));
		},
		playerJump: function () {
			!this.player.body.moves ||
				this.game.paused ||
				this.player.customParams.emit ||
				(this.jumpCount < 2 &&
					this.player.body.velocity.y > -this.JUMPING_SPEED &&
					(this.player.customParams.hotSauce
						? Math.abs(this.player.body.velocity.x) == this.RUNNING_SPEED
							? (this.player.body.velocity.y = -1.3 * this.JUMPING_SPEED * 1.1875)
							: (this.player.body.velocity.y = 1.3 * -this.JUMPING_SPEED)
						: Math.abs(this.player.body.velocity.x) == this.RUNNING_SPEED
						? (this.player.body.velocity.y = -1.1875 * this.JUMPING_SPEED)
						: (this.player.body.velocity.y = -this.JUMPING_SPEED),
					this.player.alive &&
						!this.player.customParams.emit &&
						(this.player.customParams.underwater ? this.swimSFX.play() : this.jumpSound.play()),
					this.jumpCount++,
					2 == this.jumpCount &&
						(this.player.customParams.facingRight
							? ((this.doubleJumpActive = !0), (this.doubleJumpDirection = 'right'))
							: ((this.doubleJumpActive = !0), (this.doubleJumpDirection = 'left')))));
		},
		pauseGame: function () {
			if (this.game.paused)
				if (3 == this.selectedPauseOption)
					this.pauseConfirm
						? 0 == this.pauseConfirmOption
							? (this.state.start('Menu'),
							  this.levelMusic.stop(),
							  this.stopSFXBeforeChange(),
							  (this.game.paused = !1))
							: ((this.resumeGameLabel.alpha = 1),
							  (this.weaponControlLabel.alpha = 1),
							  (this.charControlLabel.alpha = 1),
							  (this.returnToTitleLabel.alpha = 1),
							  this.confirmLabel.destroy(),
							  this.yeaLabel.destroy(),
							  this.naLabel.destroy(),
							  (this.pauseConfirm = !1))
						: ((this.resumeGameLabel.alpha = 0),
						  (this.weaponControlLabel.alpha = 0),
						  (this.charControlLabel.alpha = 0),
						  (this.returnToTitleLabel.alpha = 0),
						  (this.pauseConfirm = !0),
						  (this.pauseConfirmOption = 0),
						  (this.confirmLabel = this.game.add.text(
								this.camera.x + 80,
								this.camera.y + 0.5 * this.camera.height + 30,
								'You sure?',
								{ font: '25px Geo', fill: '#fff' }
						  )),
						  this.confirmLabel.anchor.setTo(0, 0.5),
						  (this.confirmLabel.fixedToCamera = !0),
						  (this.confirmLabel.stroke = '#000000'),
						  (this.confirmLabel.strokeThickness = 3),
						  (this.yeaLabel = this.game.add.text(
								this.camera.x + 80,
								this.camera.y + 0.5 * this.camera.height + 60,
								'yea',
								{ font: '25px Geo', fill: '#ffd700' }
						  )),
						  this.yeaLabel.anchor.setTo(0, 0.5),
						  (this.yeaLabel.fixedToCamera = !0),
						  (this.yeaLabel.stroke = '#000000'),
						  (this.yeaLabel.strokeThickness = 3),
						  (this.naLabel = this.game.add.text(
								this.camera.x + 150,
								this.camera.y + 0.5 * this.camera.height + 60,
								'na',
								{ font: '25px Geo', fill: '#fff' }
						  )),
						  this.naLabel.anchor.setTo(0, 0.5),
						  (this.naLabel.fixedToCamera = !0),
						  (this.naLabel.stroke = '#000000'),
						  (this.naLabel.strokeThickness = 3));
				else {
					this.pauseLabel.destroy(),
						this.resumeGameLabel.destroy(),
						this.weaponControlLabel.destroy(),
						this.charControlLabel.destroy(),
						this.controls.destroy(),
						this.scoreLabelFake.destroy(),
						this.healthLabelFake.destroy();
					for (t = 0; t < this.healthIconsFake.length; t++) this.healthIconsFake[t].destroy();
					this.bulletIconFake.destroy(),
						this.weaponLabelFake.destroy(),
						this.scoreLabelFake.destroy(),
						this.returnToTitleLabel.destroy(),
						this.panel.destroy(),
						this.fakePlayer.destroy(),
						this.fakeHat && this.fakeHat.destroy(),
						this.levelMusic.resume(),
						(this.game.paused = !1);
				}
			else {
				(this.game.paused = !0),
					this.levelMusic.pause(),
					(this.overlay = this.add.bitmapData(2.5 * this.game.width, 2.5 * this.game.height)),
					(this.overlay.ctx.fillStyle = '#000'),
					this.overlay.ctx.fillRect(0, 0, 2.5 * this.game.width, 2.5 * this.game.height),
					(this.panel = this.add.sprite(this.player.x, this.player.y, this.overlay)),
					this.panel.anchor.setTo(0.5, 0.5),
					(this.panel.alpha = 0.55),
					(this.controls = this.add.sprite(
						this.camera.x + 0.5 * this.camera.width,
						this.camera.y + this.camera.height - 60,
						'controls'
					)),
					this.controls.anchor.setTo(0.5, 0.5),
					(this.scoreLabelFake = this.game.add.text(
						this.camera.x + 30,
						this.camera.y + 30,
						'Donuts: ' + this.player.customParams.donutCount + ' / ' + this.totalDonut,
						{ font: '20px Geo', fill: '#fff' }
					)),
					(this.scoreLabelFake.fixedToCamera = !0),
					(this.scoreLabelFake.stroke = '#000000'),
					(this.scoreLabelFake.strokeThickness = 2),
					this.player.customParams.donutCount == this.totalDonut &&
						this.scoreLabel.addColor('#ffd700', 8),
					(this.healthLabelFake = this.game.add.text(
						this.camera.x + 30,
						this.camera.y + 50,
						'Health: ',
						{ font: '20px Geo', fill: '#fff' }
					)),
					(this.healthLabelFake.fixedToCamera = !0),
					(this.healthLabelFake.stroke = '#000000'),
					(this.healthLabelFake.strokeThickness = 2),
					(this.healthIconsFake = []);
				for (var t = 0; t < this.player.customParams.maxHealth; t++)
					t < this.player.customParams.health
						? (this.healthIconsFake[t] = this.add.sprite(
								this.healthLabel.x + 0.5 * this.healthLabel.width + 30 + 12 * t,
								this.camera.y + 53,
								'healthHUD1'
						  ))
						: (this.healthIconsFake[t] = this.add.sprite(
								this.healthLabel.x + 0.5 * this.healthLabel.width + 30 + 12 * t,
								this.camera.y + 53,
								'healthHUD2'
						  )),
						(this.healthIconsFake[t].fixedToCamera = !0),
						this.healthIconsFake[t].anchor.setTo(0, 0);
				(this.bulletIconFake = this.add.sprite(
					this.camera.x + (this.game.camera.width - 30),
					this.camera.y + 30,
					'bullet_icon_' + this.weaponObj[this.weaponIndex].name.replace(' ', '')
				)),
					(this.bulletIconFake.fixedToCamera = !0),
					this.bulletIconFake.anchor.setTo(1, 0),
					(this.weaponLabelFake = this.game.add.text(
						this.bulletIconFake.x - 45,
						this.camera.y + 37,
						this.weaponObj[this.weaponIndex].name,
						{ font: '20px Geo', fill: '#fff' }
					)),
					(this.weaponLabelFake.fixedToCamera = !0),
					this.weaponLabelFake.anchor.setTo(1, 0),
					(this.weaponLabelFake.stroke = '#000000'),
					(this.weaponLabelFake.strokeThickness = 2);
				var e = this.characterArray[this.characterIndex];
				(this.fakePlayer = this.add.sprite(this.player.x, this.player.y, e)),
					this.fakePlayer.scale.setTo(this.player.scale.x, this.player.scale.y),
					this.player.customParams.crouching
						? this.fakePlayer.anchor.setTo(0.5, 0)
						: this.fakePlayer.anchor.setTo(0.5, 0.5),
					(this.fakePlayer.angle = this.player.angle),
					this.player.customParams.disBoiDed && (this.fakePlayer.alpha = 0),
					this.player.customParams.hasHat &&
						((this.fakeHat = this.add.sprite(this.hat.x, this.hat.y, 'safety cap')),
						this.fakeHat.scale.setTo(this.hat.scale.x, this.hat.scale.y),
						this.fakeHat.anchor.setTo(0.5, 0.5)),
					(this.pauseLabel = this.game.add.text(
						this.camera.x + 0.2 * this.camera.width,
						this.camera.y + 0.5 * this.camera.height - 60,
						'Paused',
						{ font: '30px Geo', fill: '#fff' }
					)),
					this.pauseLabel.anchor.setTo(0.5, 0.5),
					(this.pauseLabel.fixedToCamera = !0),
					(this.pauseLabel.stroke = '#000000'),
					(this.pauseLabel.strokeThickness = 3),
					(this.resumeGameLabel = this.game.add.text(
						this.camera.x + 20,
						this.camera.y + 0.5 * this.camera.height - 10,
						'Resume Game',
						{ font: '25px Geo', fill: '#fff' }
					)),
					this.resumeGameLabel.anchor.setTo(0, 0.5),
					(this.resumeGameLabel.fixedToCamera = !0),
					(this.resumeGameLabel.stroke = '#000000'),
					(this.resumeGameLabel.strokeThickness = 3),
					(this.weaponControlLabel = this.game.add.text(
						this.camera.x + 20,
						this.camera.y + 0.5 * this.camera.height + 20,
						'Weapon: ◂' + this.weaponObj[this.weaponIndex].name + '▸',
						{ font: '25px Geo', fill: '#fff' }
					)),
					this.weaponControlLabel.anchor.setTo(0, 0.5),
					(this.weaponControlLabel.fixedToCamera = !0),
					(this.weaponControlLabel.stroke = '#000000'),
					(this.weaponControlLabel.strokeThickness = 3),
					(this.charControlLabel = this.game.add.text(
						this.camera.x + 20,
						this.camera.y + 0.5 * this.camera.height + 50,
						'Character: ◂' + this.characterArray[this.characterIndex] + '▸',
						{ font: '25px Geo', fill: '#fff' }
					)),
					this.charControlLabel.anchor.setTo(0, 0.5),
					(this.charControlLabel.fixedToCamera = !0),
					(this.charControlLabel.stroke = '#000000'),
					(this.charControlLabel.strokeThickness = 3),
					(this.returnToTitleLabel = this.game.add.text(
						this.camera.x + 20,
						this.camera.y + 0.5 * this.camera.height + 80,
						'Return to Title Screen',
						{ font: '25px Geo', fill: '#fff' }
					)),
					this.returnToTitleLabel.anchor.setTo(0, 0.5),
					(this.returnToTitleLabel.fixedToCamera = !0),
					(this.returnToTitleLabel.stroke = '#000000'),
					(this.returnToTitleLabel.strokeThickness = 3),
					0 == this.selectedPauseOption
						? this.resumeGameLabel.addColor('#ffd700', 0)
						: 1 == this.selectedPauseOption
						? this.weaponControlLabel.addColor('#ffd700', 7)
						: 2 == this.selectedPauseOption
						? this.charControlLabel.addColor('#ffd700', 11)
						: 3 == this.selectedPauseOption && this.returnToTitleLabel.addColor('#ffd700', 0);
			}
		},
		changeWeaponPaused: function (t, e) {
			if (this.game.paused) {
				if ('right' == e) {
					for (
						this.weaponIndex >= this.weaponObj.length - 1
							? (this.weaponIndex = 0)
							: this.weaponIndex++;
						this.weaponIndex < this.weaponObj.length - 1 && !this.weaponObj[this.weaponIndex].has;
						this.weaponIndex++
					);
					this.weaponObj[this.weaponIndex].has || (this.weaponIndex = 0);
				} else
					for (
						0 == this.weaponIndex
							? (this.weaponIndex = this.weaponObj.length - 1)
							: this.weaponIndex--;
						this.weaponIndex > 0 && !this.weaponObj[this.weaponIndex].has;
						this.weaponIndex--
					);
				(this.weaponLabel.text = this.weaponObj[this.weaponIndex].name),
					(this.weaponControlLabel.text =
						'Weapon: ◂' + this.weaponObj[this.weaponIndex].name + '▸'),
					this.bulletIcon.loadTexture(
						'bullet_icon_' + this.weaponObj[this.weaponIndex].name.replace(' ', '')
					),
					(this.weaponLabelFake.text = this.weaponObj[this.weaponIndex].name),
					this.bulletIconFake.loadTexture(
						'bullet_icon_' + this.weaponObj[this.weaponIndex].name.replace(' ', '')
					);
			}
		},
		changeCharacterPaused: function (t, e) {
			this.game.paused &&
				('right' == e
					? this.characterIndex >= this.characterArray.length - 1
						? (this.characterIndex = 0)
						: this.characterIndex++
					: 0 == this.characterIndex
					? (this.characterIndex = this.characterArray.length - 1)
					: this.characterIndex--,
				localStorage.setItem('DBcharIndex', this.characterIndex),
				this.player.loadTexture(this.characterArray[this.characterIndex]),
				(this.charControlLabel.text =
					'Character: ◂' + this.characterArray[this.characterIndex] + '▸'),
				this.fakePlayer.loadTexture(this.characterArray[this.characterIndex]));
		},
		showCharacterLabel: function (t) {
			(this.characterLabel.text = t),
				(this.characterLabel.timer = 90),
				(this.characterLabel.alpha = 1);
		},
		changeCharacter: function () {
			this.player.customParams.disBoiDed ||
				!this.player.body.moves ||
				this.game.paused ||
				'levelX' == this.currentLevel ||
				'levelZ' == this.currentLevel ||
				(this.characterArray.length > 1
					? (this.characterIndex >= this.characterArray.length - 1
							? (this.characterIndex = 0)
							: this.characterIndex++,
					  localStorage.setItem('DBcharIndex', this.characterIndex),
					  (this.staticSwitch = this.add.sprite(this.player.x, this.player.y, 'static')),
					  this.staticSwitch.anchor.setTo(0.5),
					  this.staticSwitch.scale.setTo(0.6),
					  this.staticSwitch.animations.add('change'),
					  this.staticSwitch.animations.play('change', null, !1, !0),
					  this.staticSFX.play(),
					  this.player.loadTexture(this.characterArray[this.characterIndex]),
					  this.showCharacterLabel(this.characterArray[this.characterIndex]))
					: this.negativeMessageTextRise('Find characters first'));
		},
		changeWeapon: function () {
			if (!this.game.paused && !this.player.customParams.disBoiDed)
				if (
					this.weaponObj[1].has ||
					this.weaponObj[2].has ||
					this.weaponObj[3].has ||
					this.weaponObj[4].has ||
					this.weaponObj[5].has ||
					this.weaponObj[6].has
				) {
					for (
						this.weaponIndex >= this.weaponObj.length - 1
							? (this.weaponIndex = 0)
							: this.weaponIndex++;
						this.weaponIndex < this.weaponObj.length - 1 && !this.weaponObj[this.weaponIndex].has;
						this.weaponIndex++
					);
					this.weaponObj[this.weaponIndex].has || (this.weaponIndex = 0),
						(this.weaponLabel.text = this.weaponObj[this.weaponIndex].name),
						this.bulletIcon.loadTexture(
							'bullet_icon_' + this.weaponObj[this.weaponIndex].name.replace(' ', '')
						),
						localStorage.setItem('DBweaponIndex', this.weaponIndex),
						this.weaponSwitchSFX.play();
				} else this.negativeMessageTextRise('Find weapons first');
		},
		weaponPickupChange: function (t) {
			(this.weaponIndex = t),
				localStorage.setItem('DBweaponIndex', this.weaponIndex),
				(this.weaponLabel.text = this.weaponObj[this.weaponIndex].name),
				this.bulletIcon.loadTexture(
					'bullet_icon_' + this.weaponObj[this.weaponIndex].name.replace(' ', '')
				);
		},
		initBullets: function () {
			(this.playerBullets = this.add.group()),
				(this.playerBullets.enableBody = !0),
				(this.shotgunBullets = this.add.group()),
				(this.shotgunBullets.enableBody = !0),
				(this.bubbleBullets = this.add.group()),
				(this.bubbleBullets.enableBody = !0),
				(this.foxLasers = this.add.group()),
				(this.foxLasers.enableBody = !0),
				(this.frisbees = this.add.group()),
				(this.frisbees.enableBody = !0),
				(this.kiflis = this.add.group()),
				(this.kiflis.enableBody = !0),
				(this.allBullets = [this.playerBullets, this.shotgunBullets]),
				(this.allBulletsTrue = [
					this.playerBullets,
					this.shotgunBullets,
					this.bubbleBullets,
					this.foxLasers,
					this.frisbees,
					this.kiflis
				]);
		},
		createPlayerBullet: function () {
			if (0 == this.weaponIndex || (1 == this.weaponIndex && !this.game.paused))
				if (this.weaponObj[this.weaponIndex].ammo > 0) {
					if (this.player.alive && this.player.body.moves) {
						var t = this.playerBullets.getFirstExists(!1);
						t
							? (t.reset(this.player.x, this.player.top + this.player.height / 2 + 5),
							  (t.customParams.timesCollided = 0))
							: ((t = new FaceGame.PlayerBullet(
									this.game,
									this.player.x,
									this.player.top + this.player.height / 2 + 5
							  )),
							  this.playerBullets.add(t)),
							this.pistolSFX.play();
					}
					if (this.player.body.moves) {
						t.body.gravity.y = 0;
						var e = 0.1 + Math.random() * (0.3 - 0.1),
							s = 0.1 + 0.6 * Math.random();
						if ((t.body.bounce.set(e, s), 1 == this.weaponIndex)) {
							var i = 338 * Math.random() - 169;
							t.damageDeal = 0.57;
						} else t.damageDeal = 1;
						(t.rotation = 0),
							this.player.customParams.facingRight
								? ((t.body.velocity.x = -this.BULLET_SPEED),
								  1 == this.weaponIndex && (t.body.velocity.y = -i),
								  t.scale.setTo(1))
								: ((t.body.velocity.x = this.BULLET_SPEED),
								  1 == this.weaponIndex && (t.body.velocity.y = i),
								  t.scale.setTo(-1)),
							(t.customParams.activatedSwitch = !1),
							Math.abs(t.x - this.player.x) > 50 && t.kill();
					}
				} else this.dryfireSFX.play();
		},
		createShotgunBullet: function () {
			if (
				this.player.alive &&
				this.player.body.moves &&
				2 == this.weaponIndex &&
				!this.shotgunSFX.isPlaying &&
				!this.game.paused
			)
				if (this.weaponObj[this.weaponIndex].ammo > 0) {
					for (var t = 0; t < 8; t++) {
						var e = this.shotgunBullets.getFirstExists(!1);
						e
							? e.reset(this.player.x, this.player.top + this.player.height / 2 + 5)
							: ((e = new FaceGame.ShotgunBullet(
									this.game,
									this.player.x,
									this.player.top + this.player.height / 2 + 5
							  )),
							  this.shotgunBullets.add(e)),
							(e.body.gravity.y = 0);
						var s = 0.1 + Math.random() * (0.3 - 0.1),
							i = 0.1 + 0.6 * Math.random();
						e.body.bounce.set(s, i);
						var a = 138 * Math.random() - 69;
						e.damageDeal = 0.8;
						var h = (40 + 20 * Math.random()) * (Math.random() < 0.5 ? 1 : -1);
						(e.rotation = 0),
							this.player.customParams.facingRight
								? ((e.body.velocity.x = -this.BULLET_SPEED + h),
								  (e.body.velocity.y = -a),
								  e.scale.setTo(1))
								: ((e.body.velocity.x = this.BULLET_SPEED + h),
								  (e.body.velocity.y = a),
								  e.scale.setTo(-1)),
							(e.customParams.timesCollided = 0),
							(e.customParams.activatedSwitch = !1),
							Math.abs(e.x - this.player.x) > 50 && e.kill();
					}
					this.shotgunSFX.play();
				} else this.dryfire2SFX.play();
		},
		createBubbleBullet: function () {
			if (this.player.alive && this.player.body.moves && 3 == this.weaponIndex && !this.game.paused)
				if (this.weaponObj[this.weaponIndex].ammo > 0) {
					var t = this.bubbleBullets.getFirstExists(!1);
					this.bubbleGunUpOrDown++,
						t
							? (t.reset(this.player.x, this.player.top + this.player.height / 2 + 2, this.player),
							  (t.customParams.originalX = this.player.x),
							  (t.customParams.originalY = this.player.top + this.player.height / 2 + 2),
							  (t.customParams.moveEight = this.player.x),
							  (t.upOrDown = this.bubbleGunUpOrDown))
							: ((t = new FaceGame.BubbleBullet(
									this.game,
									this.player.x,
									this.player.top + this.player.height / 2 + 2,
									this.player
							  )),
							  this.bubbleBullets.add(t),
							  (t.upOrDown = this.bubbleGunUpOrDown)),
						(t.body.gravity.y = 0),
						(t.damageDeal = 4),
						this.player.customParams.facingRight
							? (t.body.velocity.x = 0.3 * -this.BULLET_SPEED)
							: (t.body.velocity.x = 0.3 * this.BULLET_SPEED),
						t.scale.setTo(0.5),
						(t.customParams.timesCollided = 0),
						(t.customParams.activatedSwitch = !1),
						Math.abs(t.x - this.player.x) > 50 && t.kill(),
						this.milonSFX.play();
				} else this.dryfire2SFX.play();
		},
		createFoxLaser: function () {
			if (
				this.player.alive &&
				this.player.body.moves &&
				4 == this.weaponIndex &&
				!this.laserSFX.isPlaying &&
				!this.game.paused
			)
				if (this.weaponObj[this.weaponIndex].ammo > 0) {
					var t = this.foxLasers.getFirstExists(!1);
					t
						? (t.reset(this.player.x, this.player.top + this.player.height / 2 + 2, this.player),
						  (t.alreadyHitIDs = []),
						  (t.customParams.fullLength = !1))
						: ((t = new FaceGame.FoxLaser(
								this.game,
								this.player.x,
								this.player.top + this.player.height / 2 + 2,
								this.player
						  )),
						  this.foxLasers.add(t),
						  (t.alreadyHitIDs = []),
						  (t.customParams.fullLength = !1)),
						(t.body.gravity.y = 0);
					Math.random();
					(t.damageDeal = 2.5),
						this.player.customParams.facingRight
							? (t.anchor.setTo(0, 0.5), t.scale.setTo(0.02, 1))
							: (t.anchor.setTo(1, -0.5), t.scale.setTo(0.02, 1)),
						(t.customParams.timesCollided = 0),
						(t.customParams.activatedSwitch = !1),
						Math.abs(t.x - this.player.x) > 50 && t.kill(),
						this.laserSFX.play();
				} else this.dryfire2SFX.play();
		},
		createFrisbee: function () {
			if (
				this.player.alive &&
				this.player.body.moves &&
				5 == this.weaponIndex &&
				!this.frisbeeSFX.isPlaying &&
				!this.game.paused
			)
				if (this.weaponObj[this.weaponIndex].ammo > 0) {
					var t = this.frisbees.getFirstExists(!1);
					t
						? (t.reset(this.player.x, this.player.top + this.player.height / 2 + 2, this.player),
						  (t.lastEnemyHitID = null))
						: ((t = new FaceGame.Frisbee(
								this.game,
								this.player.x,
								this.player.top + this.player.height / 2 + 2,
								this.player
						  )),
						  this.frisbees.add(t),
						  (t.lastEnemyHitID = null)),
						(t.body.gravity.y = 100),
						(t.rotation = 0),
						(t.damageDeal = 2),
						this.player.customParams.facingRight
							? (t.anchor.setTo(0.5),
							  (t.body.velocity.x = 0.2 * -this.BULLET_SPEED),
							  (t.body.velocity.y = -70))
							: (t.anchor.setTo(0.5),
							  (t.body.velocity.x = 0.2 * this.BULLET_SPEED),
							  (t.body.velocity.y = -70)),
						(t.customParams.timesCollided = 0),
						(t.customParams.activatedSwitch = !1),
						(t.customParams.ableToReflect = !1),
						Math.abs(t.x - this.player.x) > 50 && t.kill(),
						this.frisbeeSFX.play();
				} else this.dryfire2SFX.play();
		},
		createKifli: function () {
			if (
				this.player.alive &&
				this.player.body.moves &&
				6 == this.weaponIndex &&
				!this.game.paused &&
				this.player.customParams.kifliTimer < 1
			)
				if (this.weaponObj[this.weaponIndex].ammo > 0) {
					this.player.customParams.kifliTimer = 20;
					var t = this.kiflis.getFirstExists(!1);
					if (t) {
						t.reset(this.player.x, this.player.top + this.player.height / 2 + 2, this.player),
							(t.alreadyHitIDs = []),
							(t.customParams.completedPath = !1),
							(t.accuracy = 0.01),
							(t.angle = 0),
							(t.customParams.collided = !1),
							(t.customParams.killTimer = 0),
							(t.body.gravity.y = 0);
						var e = this.player.customParams.facingRight ? 1 : -1;
						(t.p0 = { x: this.player.x + 10 * e, y: this.player.y + 10 }),
							(t.p1 = { x: this.player.x + 450 * e, y: this.player.y - 200 }),
							(t.p2 = { x: this.player.x + 460 * e, y: this.player.y + 200 }),
							(t.p3 = { x: this.player.x, y: this.player.y });
					} else
						(t = new FaceGame.Kifli(
							this.game,
							this.player.x,
							this.player.top + this.player.height / 2 + 2,
							this.player
						)),
							this.kiflis.add(t),
							(t.alreadyHitIDs = []);
					(t.rotation = 0),
						(t.damageDeal = 2),
						this.player.customParams.facingRight,
						t.anchor.setTo(0.5),
						(t.customParams.timesCollided = 0),
						(t.customParams.activatedSwitch = !1),
						Math.abs(t.x - this.player.x) > 50 && t.kill(),
						t.wooshSFX.play();
				} else this.dryfire2SFX.play();
		},
		bulletCollides: function (t, e) {
			if (0 == t.customParams.timesCollided) {
				'frisbee' == t.key && this.frisbeeThudSFX.play(),
					(t.body.gravity.y = this.GAME_GRAVITY + 700),
					t.customParams.timesCollided++;
				var s = 600 * Math.random() - 200;
				t.body.velocity.y = -s;
				var i = 40 * Math.random() - 20;
				(t.rotation += i),
					t.customParams.timesCollided >= 1 &&
						this.game.time.events.add(500, function () {
							t.alive && t.kill();
						});
			}
		},
		bulletDeflect: function (t, e) {
			if ('kifli' == t.key) this.deflectKifli(t, e);
			else if ('foxLaser' == t.key);
			else if (('baker' == e.key && e.deflect(), 0 == t.customParams.timesCollided)) {
				(t.body.gravity.y = this.GAME_GRAVITY + 700), t.customParams.timesCollided++;
				var s = 600 * Math.random() - 200;
				t.body.velocity.y = -s;
				var i = t.body.velocity.x > 0 ? -1 : 1,
					a = 20 + 330 * Math.random();
				t.body.velocity.x = a * i;
				var h = 40 * Math.random() - 20;
				(t.rotation += h),
					t.customParams.timesCollided >= 1 &&
						this.game.time.events.add(500, function () {
							t.alive && t.kill();
						});
			}
		},
		deflectKifli: function (t, e) {
			t.customParams.collided || (t.customParams.timesCollided++, t.collided()),
				'baker' == e.key && e.deflect();
		},
		shootUnburyGrave: function (t, e) {
			e.kill(),
				(t.damageTaken += e.damageDeal),
				Math.floor(t.damageTaken) != t.previousDamage &&
					((t.previousDamage = Math.floor(t.damageTaken)),
					Math.floor(4 != t.damageTaken) && this.rockCrumbleSFX.play(),
					(this.unburyEmit.x = t.x),
					(this.unburyEmit.y = t.y),
					this.unburyEmit.start(!0, 500, null, 12)),
				(t.frame = Math.floor(t.damageTaken)),
				t.damageTaken >= 4 &&
					(t.kill(),
					this.rockDestroySFX.play(),
					(this.plsUnburyEmitter.x = this.unburyGround.x),
					(this.plsUnburyEmitter.y = this.unburyGround.y),
					this.plsUnburyEmitter.start(!0, 2e3, null, 12),
					this.unburyGround.kill());
		},
		ghostBetray: function (t, e) {
			'default' == e.customParams.state && e.betrayed();
		},
		managePlayerVelocities: function () {
			this.player.customParams.underwater
				? ((this.RUNNING_SPEED = 140),
				  (this.JUMPING_SPEED = 170),
				  (this.BOUNCING_SPEED = 110),
				  (this.BULLET_SPEED = -500),
				  (this.ACC = 3.5),
				  (this.DEC = 12.5),
				  (this.FRICTION = 8),
				  (this.FASTFALL = 140))
				: this.player.customParams.crouching && this.cursors.down.isDown
				? ((this.RUNNING_SPEED = 180),
				  (this.JUMPING_SPEED = 220),
				  (this.ACC = 4),
				  (this.DEC = 15),
				  (this.FRICTION = 10))
				: ((this.RUNNING_SPEED = 280),
				  (this.JUMPING_SPEED = 360),
				  (this.BOUNCING_SPEED = 220),
				  (this.BULLET_SPEED = -1e3),
				  (this.ACC = 7),
				  (this.DEC = 25),
				  (this.FRICTION = 16),
				  (this.FASTFALL = 285));
		},
		underwater: function () {
			this.player.customParams.underwater ||
				((this.player.body.gravity.y = this.GAME_GRAVITY / 2),
				(this.player.body.velocity.x = 0.5 * this.player.body.velocity.x),
				(this.player.body.velocity.y = 0.25 * this.player.body.velocity.y),
				(this.dropletEmitter.on = !1),
				'levelAA' != this.currentLevel && this.splashSFX.play(),
				'levelAA' != this.currentLevel &&
					((this.splashEmitter = this.game.add.emitter(this.player.x, this.player.y, 10)),
					this.splashEmitter.makeParticles('water_drop'),
					this.game.physics.arcade.enable(this.splashEmitter),
					(this.splashEmitter.minParticleScale = 1),
					(this.splashEmitter.maxParticleScale = 4),
					(this.splashEmitter.minParticleAlpha = 0.3),
					(this.splashEmitter.maxParticleAlpha = 0.7),
					(this.splashEmitter.gravity = this.GAME_GRAVITY),
					this.splashEmitter.setYSpeed(-100, -250),
					this.splashEmitter.setXSpeed(-250, 250),
					this.splashEmitter.start(!0, 800, null, 8)),
				(this.player.customParams.underwater = !0),
				this.managePlayerVelocities()),
				(this.jumpCount = 0);
		},
		leftTheWater: function () {
			this.player.customParams.underwater &&
				((this.jumpCount = 1),
				(this.player.body.velocity.y = 1.5 * this.player.body.velocity.y),
				(this.player.body.gravity.y = this.GAME_GRAVITY),
				(this.player.customParams.underwater = !1),
				'levelAA' != this.currentLevel && (this.dropletEmitter.on = !0),
				(('levelR' == this.currentLevel && this.sizzleSFX.isPlaying) ||
					('levelAA' == this.currentLevel && this.sizzleSFX.isPlaying)) &&
					this.sizzleSFX.stop(),
				(this.dropletTime = this.game.time.time),
				this.managePlayerVelocities());
		},
		zTrapActivate: function (t, e) {
			if (!e.activated) {
				this.evilLaughSFX.play(),
					(e.activated = !0),
					this.game.time.events.add(
						2500,
						function () {
							e.kill();
						},
						this
					),
					(e.body.allowGravity = !0),
					(e.body.gravity.y = this.GAME_GRAVITY - 100),
					(e.body.checkCollision.down = !1),
					this.zTrapTween.stop(),
					(this.zTrapTween = null),
					this.zTrapGates.children[0].closeIt(),
					this.zTrapGates.children[1].closeIt();
				for (var s = 0; s < this.enemies8.children.length; s++)
					this.enemies8.children[s].zTrap && (this.enemies8.children[s].zTrapTransition = !0);
				this.game.time.events.add(100, function () {}, this);
			}
		},
		keySurprise: function () {
			var t = new FaceGame.Enemy3(
				this.game,
				this.keySurpriseSpawn[0].x + 200,
				this.keySurpriseSpawn[0].y,
				'spider',
				2,
				this.map,
				this.player,
				0.5,
				8,
				this.uniqueID++
			);
			this.enemies3.add(t);
			var e = new FaceGame.Enemy3(
				this.game,
				this.keySurpriseSpawn[0].x - 150,
				this.keySurpriseSpawn[0].y,
				'spider',
				2,
				this.map,
				this.player,
				0.5,
				8,
				this.uniqueID++
			);
			this.enemies3.add(e);
			var s = new FaceGame.Enemy8(
				this.game,
				this.keySurpriseSpawn[0].x + 120,
				this.keySurpriseSpawn[0].y + 150,
				'zombie1',
				'true',
				'true',
				null,
				this.player,
				this.map,
				this.zSurpriseEmitter,
				this.uniqueID++
			);
			this.enemies8.add(s);
			var i = new FaceGame.Enemy8(
				this.game,
				this.keySurpriseSpawn[0].x - 140,
				this.keySurpriseSpawn[0].y + 100,
				'zombie2',
				'true',
				'true',
				null,
				this.player,
				this.map,
				this.zSurpriseEmitter,
				this.uniqueID++
			);
			this.enemies8.add(i);
			var a = new FaceGame.Enemy(
				this.game,
				this.keySurpriseSpawn[0].x - 120,
				this.keySurpriseSpawn[0].y - 80,
				'rat',
				null,
				this.map,
				!1,
				!1,
				this.player,
				this.uniqueID++
			);
			this.enemies.add(a);
			var h = new FaceGame.Enemy(
				this.game,
				this.keySurpriseSpawn[0].x + 100,
				this.keySurpriseSpawn[0].y - 40,
				'rat',
				null,
				this.map,
				!1,
				!1,
				this.player,
				this.uniqueID++
			);
			this.enemies.add(h);
			var o = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn[0].x - 80,
				this.keySurpriseSpawn[0].y - 80,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(o);
			var r = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn[0].x + 180,
				this.keySurpriseSpawn[0].y - 70,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(r);
			var l = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn2[0].x - 100,
				this.keySurpriseSpawn2[0].y,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(l);
			var n = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn2[0].x + 100,
				this.keySurpriseSpawn2[0].y,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(n);
			var m = new FaceGame.Enemy(
				this.game,
				this.keySurpriseSpawn3[0].x,
				this.keySurpriseSpawn3[0].y,
				'rat',
				null,
				this.map,
				!1,
				!1,
				this.player,
				this.uniqueID++
			);
			this.enemies.add(m);
			var c = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn3[0].x - 550,
				this.keySurpriseSpawn3[0].y - 70,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(c);
			var d = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn3[0].x - 250,
				this.keySurpriseSpawn3[0].y - 80,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(d);
			var p = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn3[0].x + 165,
				this.keySurpriseSpawn3[0].y - 60,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(p);
			var y = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn3[0].x + 280,
				this.keySurpriseSpawn3[0].y - 70,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(y);
			var u = new FaceGame.Enemy2(
				this.game,
				this.keySurpriseSpawn3[0].x + 410,
				this.keySurpriseSpawn3[0].y - 75,
				'cute_bat',
				null,
				this.map,
				this.uniqueID++
			);
			this.enemies2.add(u);
			var g = new FaceGame.Enemy8(
				this.game,
				this.keySurpriseSpawn3[0].x + 710,
				this.keySurpriseSpawn3[0].y + 90,
				'zombie3',
				'true',
				'true',
				null,
				this.player,
				this.map,
				this.zSurpriseEmitter,
				this.uniqueID++
			);
			this.enemies8.add(g);
		},
		spiderBabies: function (t, e) {
			for (var s = [], i = 10 + 4 * Math.random(), a = 0; a < i; a++) {
				var h = 0.2 + Math.random() * (0.3 - 0.2),
					o = 320 * Math.random() - 100,
					r = -270 * Math.random() - 100;
				(s[a] = new FaceGame.Enemy3(
					this.game,
					t,
					e,
					'spider',
					2,
					this.map,
					this.player,
					h,
					0.3,
					this.uniqueID++
				)),
					this.enemies3.add(s[a]),
					(s[a].body.velocity.x = o),
					(s[a].body.velocity.y = r);
			}
		},
		heyThereCutie: function () {
			this.itemNameTextRise('Fuck off');
		},
		openSand: function () {
			this.rockDestroySFX.play(), this.fakeSandEmit.start(!0, 2e3, null, 32), this.fakeSand.kill();
		},
		graveSecretFunc: function () {
			this.rockDestroySFX.play(), this.graveSecret.kill();
		},
		killProjectileCollide: function (t, e) {
			t.kill();
		},
		sortOfBeginAbort: function () {
			this.fishAlarmSFX.play(),
				this.realBigFishs.children[0].nervousAnim.play(),
				(this.player.customParams.allowMovement = !1),
				(this.player.body.velocity.x = 0),
				(this.player.body.velocity.y = 0),
				(this.jumpCount = 2),
				this.game.camera.follow(null),
				this.game.add
					.tween(this.game.camera)
					.to(
						{
							x: this.fakeWater.x - 0.5 * this.game.camera.width,
							y: this.fakeWater.y - 0.85 * this.game.camera.height
						},
						2e3,
						'Exponential',
						!0
					)
					.easing(Phaser.Easing.Exponential.Out)
					.start();
		},
		beginAbort: function () {
			(this.abortFishstick = this.game.time.events.loop(
				0.015 * Phaser.Timer.SECOND,
				this.abortProjectXXLFishStick,
				this
			)),
				this.waterDrainSFX.play(),
				this.game.time.events.add(
					12e3,
					function () {
						this.game.time.events.remove(this.abortFishstick),
							this.fakeWater.kill(),
							this.realBigFishs.children[0].kill(),
							this.waterDrainSFX.stop();
					},
					this
				),
				this.game.time.events.add(
					5e3,
					function () {
						for (var t in this.doors.children)
							this.doors.children[t].customParams.fishstick &&
								(this.doors.children[t].customParams.open = 1);
						this.game.camera.follow(null);
						var e = this.game.add
							.tween(this.game.camera)
							.to(
								{
									x: this.player.x - 0.5 * this.game.camera.width,
									y: this.player.y - 0.5 * this.game.camera.height
								},
								800,
								'Exponential',
								!0
							)
							.easing(Phaser.Easing.Exponential.Out);
						e.onComplete.add(function () {
							(this.player.customParams.allowMovement = !0),
								this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
						}, this),
							e.start();
					},
					this
				);
		},
		abortProjectXXLFishStick: function () {
			this.fakeWater.y++,
				this.realBigFishs.children[0].y++,
				(this.realBigFishs.children[0].customParams.originalY += 1);
		},
		scheduleTileReplace: function (t, e, s, i, a, h, o) {
			var r = o;
			this.map.swap(t, e, s, i, a, h, this.staticFGLayer),
				r++,
				this.tileReplaceTimer.add(
					0.75 * Phaser.Timer.SECOND,
					function () {
						this.scheduleTileReplace(t, e, s, i, a, h, r);
					},
					this
				);
		},
		insidePress: function (t, e) {
			e.body.touching.up ||
				(t.x < e.x
					? t.customParams.facingRight
						? (t.x = e.x - 0.5 * e.width - 0.5 * t.width)
						: (t.x = e.x - 0.5 * e.width + 0.5 * t.width)
					: t.customParams.facingRight
					? (t.x = e.x + 0.5 * e.width + 0.5 * t.width)
					: (t.x = e.x + 0.5 * e.width - 0.5 * t.width));
		},
		onThePress: function (t, e) {
			(this.timeCheck4 = this.game.time.now),
				(t.customParams.touchingPress = !0),
				e.body.velocity.y < 0 && t.body.touching.down && (t.body.velocity.y = 0);
		},
		onThePlat: function (t, e) {
			e.body.velocity.y < 0 && (t.body.velocity.y = 0);
		},
		onThePlatFalling: function (t, e) {
			e.customParams.fall ||
				e.customParams.helpIveFallenAndICantGetUp ||
				((e.body.allowGravity = !0),
				(e.body.immovable = !1),
				(e.customParams.helpIveFallenAndICantGetUp = !0));
		},
		pearlBounce: function (t, e) {
			t.tinkSFX.play(), t.bounceCount++, t.bounceCount >= 2 && t.kill();
		},
		breadPressed: function (t, e) {
			t.customParams.onTheGround ||
				((t.customParams.needToFall = !1),
				(t.customParams.onTheGround = !0),
				(t.body.velocity.y = 0),
				this.game.time.events.add(
					1500,
					function () {
						t.rise();
					},
					this
				));
		},
		openCageCheck: function (t, e) {
			t.customParams.hasKey
				? (this.cageOpenTween.start(),
				  this.keyHUD && (this.gateOpeningSFX.play(), this.keyHUD.kill()),
				  this.game.time.events.add(
						1e3,
						function () {
							e.kill();
						},
						this
				  ))
				: (!this.negativeMessageLabel || this.negativeMessageLabel.alpha < 0) &&
				  (this.negativeMessageTextRise('Need a Key...'), this.lockedDoorSFX.play());
		},
		touchingCrate: function (t, e) {
			(this.timeCheck2 = this.game.time.now),
				(t.customParams.touchingCrate = !0),
				(e.customParams.beingTouched = !0),
				(e.customParams.lastTouched = this.game.time.now);
		},
		crateOnEnemy: function (t, e) {
			e.body.touching.up && (e.damage(10, 'jump'), t.customParams.metal || t.damage(10, 'jump'));
		},
		hitSwitch: function (t, e) {
			var s = e.customParams.timeLastHit,
				i = !0;
			t.customParams.timesCollided > 0 && (i = !1),
				'sortOfBeginAbort' == e.customFunction && void 0 == t.customParams.donutCount && (i = !1),
				FaceGame.GameState.time.now < s + 100 &&
					((i = !1), (e.customParams.timeLastHit = FaceGame.GameState.time.now)),
				i && e.onOff();
		},
		switchChange: function (t, e, s, i) {
			if (i) var a = 2;
			else a = 1;
			for (var h = t, o = i, r = 0; r < a + 2; r++) {
				if (0 == r) var l = h;
				else l = o;
				if ('conveyers' == l)
					for (r = 0; r < this[l].children.length; r++)
						this[l].children[r].customParams.switchTie == e &&
							(1 != this[l].children[r].customParams.on
								? ((this[l].children[r].customParams.on = 1),
								  this[l].children[r].customParams.anim.play())
								: ((this[l].children[r].customParams.on = 0),
								  this[l].children[r].customParams.anim.stop()));
				else if ('doors' == l)
					for (r = 0; r < this[l].children.length; r++)
						this[l].children[r].customParams.switchTie == e &&
							(this[l].children[r].customParams.open =
								0 == this[l].children[r].customParams.open ? 1 : 0);
				else if ('platforms' == l)
					for (r = 0; r < this[l].children.length; r++)
						this[l].children[r].customParams.switchTie == e &&
							(1 == this[l].children[r].customParams.on
								? ((this[l].children[r].body.moves = !1), (this[l].children[r].customParams.on = 0))
								: ((this[l].children[r].body.moves = !0),
								  (this[l].children[r].customParams.on = 1)));
				else if ('hatches' == l)
					for (r = 0; r < this[l].children.length; r++)
						this[l].children[r].customParams.switchTie == e && this[l].children[r].openClose();
				else 'bubbles' == l && this.bubblesOnOff(s.frame);
			}
		},
		onSpringLauncher: function (t, e) {
			(e.customParams.playerOnTopTimer = this.game.time.now),
				e.customParams.playerOnTop || (e.customParams.playerOnTop = !0);
		},
		onElevator: function (t, e) {
			e.customParams.movingUp && (t.body.velocity.y = 0),
				e.body.touching.up &&
					((e.customParams.playerOnTopTimer = this.game.time.now),
					e.customParams.playerOnTop || (e.customParams.playerOnTop = !0));
		},
		onChainLift: function (t, e) {
			e.customParams.movingUp && (t.body.velocity.y = 0),
				e.body.touching.up &&
					((e.customParams.playerOnTopTimer = this.game.time.now),
					e.customParams.playerOnTop || (e.customParams.playerOnTop = !0));
		},
		onButton: function (t, e) {
			e.body.touching.up &&
				(e.customParams.playerOnTop ||
					((e.customParams.playerOnTop = !0),
					e.body.velocity.y < 0 &&
						((e.body.velocity.y *= -1), (t.body.velocity.y = e.body.velocity.y))),
				e.customParams.playerOnTop && (e.customParams.playerOnTopTimer = this.game.time.now));
		},
		conveyerVelocity: function (t, e) {
			1 == e.customParams.on && (t.body.velocity.x = 60 * -e.customParams.pushSpeed);
		},
		onTheConveyer: function (t, e) {
			1 == e.customParams.on &&
				(0 == this.CONV_MOD &&
					(t.body.velocity.x = t.body.velocity.x + 60 * -e.customParams.pushSpeed),
				(this.CONV_MOD = 60 * -e.customParams.pushSpeed),
				(this.timeCheck5 = this.game.time.now),
				(t.customParams.touchingConv = !0));
		},
		hitBeachBall: function (t, e) {
			if (t.body.velocity.y > -40) {
				var s = -4.5 * Math.abs(e.body.velocity.y),
					i = s < -100 ? s : -100;
				(t.body.velocity.y = i), (t.body.velocity.x = 3 * (t.x - e.x));
				var a = String(Math.round(1 + 2 * Math.random()));
				t[String('beachBall' + a + 'SFX')].play();
				var h = 10 * Math.random() - 5;
				t.customParams.spinMod = h;
			}
		},
		hitBeachBall2: function (t, e) {
			if (e.body.velocity.y > -40) {
				var s = -1.5 * Math.abs(t.body.velocity.y),
					i = s < -100 ? s : -100;
				(e.body.velocity.y = i), (e.body.velocity.x = 3 * (e.x - t.x));
				var a = String(Math.round(1 + 2 * Math.random()));
				e[String('beachBall' + a + 'SFX')].play();
				var h = 0.5 + 4.5 * Math.random();
				e.customParams.spinMod = h;
			}
		},
		thwompd: function (t, e) {
			e.body.touching.down && this.gameOver(t);
		},
		puggsyEasterEgg: function (t, e) {
			void 0 != e.ableToActivate
				? ((e.timeLastTouched = this.game.time.now),
				  e.ableToActivate && (this.puggsyDieSFX.play(), (e.ableToActivate = !1)))
				: ((t.timeLastTouched = this.game.time.now),
				  t.ableToActivate &&
						0 == e.customParams.timesCollided &&
						(this.puggsyDieSFX.play(), (t.ableToActivate = !1)));
		},
		checkMsgTst: function () {},
		findObjectsByType: function (t, e, s) {
			var i = [];
			return (
				e.objects[s].forEach(function (s) {
					s.properties.type == t &&
						((s.y -= e.tileHeight / 2), (s.x += e.tileWidth / 2), i.push(s));
				}, this),
				i
			);
		},
		getGoal: function (t, e) {
			if (!t.customParams.emit) {
				this.levelMusic.stop(),
					'levelT' == this.currentLevel &&
						this.indianaRolls.children[0].rollingSFX.isPlaying &&
						(this.indianaRolls.children[0].rollingSFX.stop(),
						(this.indianaRolls.children[0].body.velocity.x = 0)),
					this.emitter.start(!1, 500, 200, 0),
					this.getGoalTune.play(),
					(this.emitter.x = t.x + 0.5 * (e.x - t.x)),
					(this.emitter.y = e.y),
					this.addCharToArray(this.levelData.goalFace),
					(this.player.body.velocity.x = 0),
					(this.player.body.velocity.y = 300),
					(t.customParams.emit = !0),
					(this.timeCheck = this.game.time.now);
				var s = 'level' + this.levelData.number + 'got';
				this.player.customParams.donutCount > this.donutTracker[s] &&
					((this.donutTracker[s] = this.player.customParams.donutCount),
					localStorage.setItem('DBdonutTracker', JSON.stringify(this.donutTracker)));
				var i = 'level' + this.levelData.number;
				(this.levelTracker[i] = !0),
					'levelT' == this.currentLevel && (this.levelTracker.completed = !0),
					localStorage.setItem('DBlevelTracker', JSON.stringify(this.levelTracker));
			}
			var a = 100 + 20 * Math.random();
			this.goal.body.blocked.down && (this.goal.body.velocity.y = -a),
				(a = 100 + 20 * Math.random()),
				this.player.body.blocked.down && (this.player.body.velocity.y = -a),
				this.game.time.now - this.timeCheck >= 5500 &&
					this.player.customParams.emit &&
					this.changeLevel(e);
		},
		changeLevel: function (t) {
			this.getGoalTune.stop(),
				(this.emitter.on = !1),
				this.stopSFXBeforeChange(),
				this.game.state.start('Game', !0, !1, t.nextLevel);
		},
		stopSFXBeforeChange: function () {
			for (var t = 0; t < this.kiflis.children.length; t++)
				this.kiflis.children[t].wooshSFX.isPlaying && this.kiflis.children[t].wooshSFX.stop();
			if ((this.getGoalTune.isPlaying && this.getGoalTune.stop(), 'levelT' == this.currentLevel)) {
				this.indianaRolls.children[0].rollingSFX.isPlaying &&
					this.indianaRolls.children[0].rollingSFX.stop();
				for (t = 0; t < this.fires.children.length; t++)
					this.fires.children[t].fireSFX.isPlaying && this.fires.children[t].fireSFX.stop();
			}
			if ('levelAA' == this.currentLevel) {
				for (t = 0; t < this.chainLifts.children.length; t++)
					this.chainLifts.children[t].chainPullSFX.isPlaying &&
						this.chainLifts.children[t].chainPullSFX.stop();
				this.elevators.children[0].elevatorSFX.isPlaying &&
					this.elevators.children[0].elevatorSFX.stop();
			}
			'levelY' == this.currentLevel && this.waterDrainSFX.isPlaying && this.waterDrainSFX.stop();
		},
		itemNameTextRise: function (t) {
			this.wli >= 3 && (this.wli = 0),
				(this.whiteLabels[this.wli] = this.game.add.text(this.player.x, this.player.y, t, {
					font: '20px Geo',
					fill: '#fff',
					align: 'center'
				})),
				this.whiteLabels[this.wli].anchor.setTo(0.5),
				(this.whiteLabels[this.wli].stroke = '#000000'),
				(this.whiteLabels[this.wli].strokeThickness = 2),
				(this.whiteLabels[this.wli].rise = !1),
				(this.whiteLabels[this.wli].fade = !1),
				(this.whiteLabels[this.wli].riseCounter = 0),
				this.prepareWhiteLabelRiseFade(this.wli),
				this.wli++;
		},
		prepareWhiteLabelRiseFade: function (t) {
			this.game.time.events.add(
				200,
				function () {
					this.whiteLabels[t].rise = !0;
				},
				this
			),
				this.game.time.events.add(
					800,
					function () {
						this.whiteLabels[t].fade = !0;
					},
					this
				);
		},
		negativeMessageTextRise: function (t) {
			this.negativeMessageLabel && this.negativeMessageLabel.destroy(),
				(this.negativeMessageLabel = this.game.add.text(this.player.x, this.player.y, t, {
					font: '20px Geo',
					fill: '#DD4F3B'
				})),
				this.negativeMessageLabel.anchor.setTo(0.5),
				(this.negativeMessageLabel.stroke = '#000000'),
				(this.negativeMessageLabel.strokeThickness = 2),
				(this.negativeMessageLabel.rise = !1),
				(this.negativeMessageLabel.fade = !1),
				(this.negativeMessageLabel.riseCounter = 0),
				this.game.time.events.add(
					200,
					function () {
						this.negativeMessageLabel.rise = !0;
					},
					this
				),
				this.game.time.events.add(
					800,
					function () {
						this.negativeMessageLabel.fade = !0;
					},
					this
				);
		},
		getHat: function (t, e) {
			!this.player.customParams.hasHat &&
				this.player.alpha > 0 &&
				(this.lostHat ||
					(this.pickupSFX.play(),
					(this.player.customParams.hasHat = !0),
					this.hatTween.stop(),
					(this.hatSpin = !1),
					(this.hat.angle = 0),
					(this.hat.body.allowGravity = !1),
					(this.hat.body.velocity.y = 0),
					(this.hat.body.velocity.x = 0),
					this.itemNameTextRise('Safety Cap Get')));
		},
		getWeapon: function (t, e) {
			for (var s in (this.weaponGetSFX.play(), this.weaponObj))
				this.weaponObj[s].name == e.customParams.name && (this.weaponObj[s].has = !0);
			this.itemNameTextRise(e.customParams.name + ' Get'),
				e.kill(),
				this.weaponPickupChange(e.customParams.index),
				localStorage.setItem('DBweapons', JSON.stringify(this.weaponObj));
			var i = 'level' + this.levelData.number + 'got',
				a = !1,
				h = e.customParams.name;
			for (s = 0; s < this.weaponTracker[i].length; s++)
				h == this.weaponTracker[i][s] && ((a = !0), (s = this.weaponTracker.length + 1));
			a ||
				(this.weaponTracker[i].push(h),
				localStorage.setItem('DBweaponTracker', JSON.stringify(this.weaponTracker)));
		},
		allWeapons: function () {
			for (var t in this.weaponObj) this.weaponObj[t].has = !0;
		},
		getSecretCharacter: function (t, e) {
			e.customParams.got ||
				(this.pickupSFX.play(),
				(e.customParams.got = !0),
				(e.body.velocity.y = -100),
				(e.body.gravity.y = this.GAME_GRAVITY),
				this.game.time.events.add(
					1500,
					function () {
						e.customParams.beginFade = !0;
					},
					this
				),
				this.addCharToArray(e.customParams.name));
		},
		addCharToArray: function (t) {
			for (var e = !1, s = 0; s < this.characterArray.length; s++)
				t == this.characterArray[s] && ((e = !0), (s = this.characterArray.length + 1));
			e ||
				(this.characterArray.push(t),
				localStorage.setItem('DBchars', JSON.stringify(this.characterArray)),
				this.itemNameTextRise(t + ' joins you!'));
			var i = 'level' + this.levelData.number + 'got',
				a = !1;
			for (s = 0; s < this.charTracker[i].length; s++)
				t == this.charTracker[i][s] && ((a = !0), (s = this.charTracker.length + 1));
			a ||
				(this.charTracker[i].push(t),
				localStorage.setItem('DBcharTracker', JSON.stringify(this.charTracker)));
		},
		getKey: function (t, e) {
			e.kill(),
				this.pickupSFX.play(),
				this.player.customParams.keyCount++,
				(this.player.customParams.hasKey = !0),
				this.keyTween.stop(),
				(this.keyHUD = this.add.sprite(30, this.game.camera.height - 30, 'gold_key')),
				(this.keyHUD.fixedToCamera = !0),
				this.keyHUD.scale.setTo(0.5, 0.5),
				this.keyHUD.anchor.setTo(0.5),
				(this.keyHUD.angle = 45),
				this.itemNameTextRise('Key Get'),
				('levelO' != this.currentLevel &&
					'levelP' != this.currentLevel &&
					'levelQ' != this.currentLevel &&
					'levelR' != this.currentLevel &&
					'levelAA' != this.currentLevel) ||
					this.keySurprise();
		},
		getDonut: function (t, e) {
			if (
				(e.kill(),
				this.eatSFX.play(),
				this.player.customParams.donutCount++,
				(this.scoreLabel.text =
					'Donuts: ' + this.player.customParams.donutCount + ' / ' + this.totalDonut),
				this.player.customParams.donutCount == this.totalDonut)
			) {
				this.yaySFX.play(),
					this.scoreLabel.addColor('#ffd700', 8),
					(this.yayEmitter.x = this.player.x),
					(this.yayEmitter.y = this.player.y),
					this.yayEmitter.start(!0, 6e3, null, 70);
				var s = 'level' + this.levelData.number + 'got';
				this.player.customParams.donutCount != this.donutTracker[s] && this.maxHealthPlus();
			}
		},
		maxHealthPlus: function () {
			this.itemNameTextRise('Max Health +1'),
				this.player.customParams.maxHealth++,
				localStorage.setItem('DBmaxHP', this.player.customParams.maxHealth),
				(this.player.customParams.health = this.player.customParams.maxHealth);
			for (var t = 0; t < this.player.customParams.maxHealth - 1; t++)
				t < this.player.customParams.health
					? this.healthIcons[t].loadTexture('healthHUD1')
					: this.healthIcons[t].loadTexture('healthHUD2');
			var e = this.add.sprite(0, 0, 'healthHUD1');
			this.healthIcons.push(e),
				(e.x = 91 + 12 * (this.healthIcons.length - 1)),
				(e.y = 53),
				(e.fixedToCamera = !0);
		},
		getHealth: function (t, e) {
			if (t.customParams.health < t.customParams.maxHealth) {
				e.fullHeal
					? ((t.customParams.health = t.customParams.maxHealth), this.itemNameTextRise('Full Heal'))
					: (t.customParams.health++, this.itemNameTextRise('Health Up')),
					this.pickupSFX.play();
				for (var s = 0; s < this.player.customParams.maxHealth; s++)
					s < this.player.customParams.health
						? this.healthIcons[s].loadTexture('healthHUD1')
						: this.healthIcons[s].loadTexture('healthHUD2');
				e.kill();
			} else
				(!this.negativeMessageLabel || this.negativeMessageLabel.alpha < 0) &&
					(this.negativeMessageTextRise('Health is Full'), this.alreadyHaveMGSSFX.play());
		},
		getAmmo: function (t, e) {
			for (var s in this.weaponObj)
				this.weaponObj[s].has && (this.weaponObj[s].ammo = this.weaponObj[s].maxAmmo);
			0 == this.weaponIndex
				? (this.ammoLabel.text = '∞')
				: (this.ammoLabel.text =
						this.weaponObj[this.weaponIndex].ammo +
						' / ' +
						this.weaponObj[this.weaponIndex].maxAmmo),
				this.pickupSFX.play(),
				e.kill();
		},
		getPill: function (t, e) {
			this.pickupSFX.play(),
				e.kill(),
				this.itemNameTextRise('Vitamin D!'),
				this.pillPowerActivate();
		},
		pillPowerActivate: function () {
			(this.player.customParams.invincible = !0),
				(this.player.customParams.invincibleTimer = 20),
				(this.invincibleLabel = this.game.add.text(
					30,
					90,
					'Invincible: ' + this.player.customParams.invincibleTimer,
					{ font: '20px Geo', fill: '#fff' }
				)),
				(this.invincibleLabel.fixedToCamera = !0),
				(this.invincibleLabel.stroke = '#000000'),
				(this.invincibleLabel.strokeThickness = 2),
				(this.invincibleEmitter = this.game.add.emitter(this.player.x, this.player.top + 20, 1e3)),
				(this.invincibleEmitter.width = Math.abs(this.player.width - 10)),
				(this.invincibleEmitter.height = Math.abs(this.player.height - 10)),
				this.invincibleEmitter.makeParticles('invincibleEmit4'),
				this.game.physics.arcade.enable(this.invincibleEmitter),
				(this.invincibleEmitter.minParticleScale = 3),
				(this.invincibleEmitter.maxParticleScale = 3.2),
				this.invincibleEmitter.start(!1, 100, 69),
				(this.invincibleEmitter.on = !1),
				(this.invincibleEmitter.on = !0),
				this.game.time.events.add(1e3, this.invincibleTimerCountdown, this);
		},
		invincibleTimerCountdown: function () {
			this.player.customParams.invincibleTimer >= 1
				? (this.player.customParams.invincibleTimer--,
				  (this.invincibleLabel.text = 'Invincible: ' + this.player.customParams.invincibleTimer),
				  this.game.time.events.add(1e3, this.invincibleTimerCountdown, this))
				: this.pillPowerDeactivate();
		},
		pillPowerDeactivate: function () {
			(this.player.customParams.invincible = !1),
				this.invincibleLabel.destroy(),
				(this.invincibleEmitter.on = !1);
		},
		getHotSauce: function (t, e) {
			this.pickupSFX.play(),
				e.kill(),
				this.itemNameTextRise("Hank's Hot Red Sauce!"),
				this.hotSaucePowerActivate();
		},
		hotSaucePowerActivate: function () {
			(this.player.customParams.hotSauce = !0),
				(this.player.customParams.hotSauceTimer = 30),
				(this.hotSauceLabel = this.game.add.text(
					30,
					70,
					"Flamin' Hot!: " + this.player.customParams.hotSauceTimer,
					{ font: '20px Geo', fill: '#fff' }
				)),
				(this.hotSauceLabel.fixedToCamera = !0),
				(this.hotSauceLabel.stroke = '#000000'),
				(this.hotSauceLabel.strokeThickness = 2),
				(this.hotEmitter = this.game.add.emitter(this.player.x, this.player.top + 20, 1e3)),
				(this.hotEmitter.width = Math.abs(this.player.width - 10)),
				(this.hotEmitter.height = Math.abs(this.player.height - 10)),
				this.hotEmitter.makeParticles(['hotEmit1', 'hotEmit2', 'hotEmit3']),
				this.game.physics.arcade.enable(this.hotEmitter),
				(this.hotEmitter.minParticleScale = 2),
				(this.hotEmitter.maxParticleScale = 3.2),
				(this.hotEmitter.minParticleAlpha = 0.5),
				(this.hotEmitter.maxParticleAlpha = 0.7),
				this.hotEmitter.setYSpeed(-30, -100),
				this.hotEmitter.setXSpeed(-40, 40),
				this.hotEmitter.start(!1, 2e3, 25),
				(this.hotEmitter.on = !1),
				(this.hotEmitter.on = !0),
				this.game.time.events.add(1e3, this.hotSauceTimerCountdown, this);
		},
		hotSauceTimerCountdown: function () {
			this.player.customParams.hotSauceTimer >= 1
				? (this.player.customParams.hotSauceTimer--,
				  (this.hotSauceLabel.text = "Flamin' Hot!: " + this.player.customParams.hotSauceTimer),
				  this.game.time.events.add(1e3, this.hotSauceTimerCountdown, this))
				: this.hotSaucePowerDeactivate();
		},
		hotSaucePowerDeactivate: function () {
			(this.player.customParams.hotSauce = !1),
				this.hotSauceLabel.destroy(),
				(this.hotEmitter.on = !1);
		},
		createEnemies: function () {
			var t, e, s, i, a, h, o, r, l, n, m, c, d;
			this.findObjectsByType('enemy', this.map, 'objectsLayer').forEach(function (e) {
				var s = e.properties.smoking ? '_smoking' : '',
					i = e.properties.drunk ? '_drunk' : '';
				(t = new FaceGame.Enemy(
					this.game,
					e.x,
					e.y,
					'rat' + s + i,
					+e.properties.velocity,
					this.map,
					e.properties.ignoreEdge,
					e.properties.drunk,
					this.player,
					this.uniqueID++
				)),
					this.enemies.add(t);
			}, this),
				this.findObjectsByType('enemy2', this.map, 'objectsLayer').forEach(function (t) {
					(e = new FaceGame.Enemy2(
						this.game,
						t.x,
						t.y,
						'cute_bat',
						+t.properties.velocity,
						this.map,
						this.uniqueID++
					)),
						this.enemies2.add(e);
				}, this),
				this.findObjectsByType('enemy3', this.map, 'objectsLayer').forEach(function (t) {
					(s = new FaceGame.Enemy3(
						this.game,
						t.x,
						t.y,
						'spider',
						+t.properties.velocity,
						this.map,
						this.player,
						+t.properties.size,
						+t.properties.health,
						this.uniqueID++
					)),
						this.enemies3.add(s);
				}, this),
				this.findObjectsByType('enemy6', this.map, 'objectsLayer').forEach(function (t) {
					(i = new FaceGame.Enemy6(
						this.game,
						t.x,
						t.y,
						'fish',
						+t.properties.velocity,
						this.map,
						t.properties.flop,
						t.properties.float,
						this.player,
						this.uniqueID++
					)),
						this.enemies6.add(i);
				}, this),
				this.findObjectsByType('enemy7', this.map, 'objectsLayer').forEach(function (t) {
					(a = new FaceGame.Enemy7(
						this.game,
						t.x,
						t.y,
						'clam',
						this.map,
						this.player,
						this.clamPearls,
						+t.properties.underwater,
						this.uniqueID++
					)),
						this.enemies7.add(a);
				}, this),
				this.findObjectsByType('enemy8', this.map, 'objectsLayer').forEach(function (t) {
					var e = Math.floor(9 * Math.random()) + 1;
					(h = new FaceGame.Enemy8(
						this.game,
						t.x,
						t.y,
						'zombie' + e,
						t.properties.surprise,
						t.properties.agro,
						t.properties.zTrap,
						this.player,
						this.map,
						this.zSurpriseEmitter,
						this.uniqueID++
					)),
						this.enemies8.add(h);
				}, this),
				this.findObjectsByType('enemy9', this.map, 'objectsLayer').forEach(function (t) {
					(o = new FaceGame.Enemy9(
						this.game,
						t.x,
						t.y,
						'toaster',
						this.map,
						this.player,
						this.toasts,
						this.uniqueID++
					)),
						this.enemies9.add(o);
				}, this),
				this.findObjectsByType('enemy10', this.map, 'objectsLayer').forEach(function (t) {
					(r = new FaceGame.Enemy10(
						this.game,
						t.x,
						t.y,
						'gunbug',
						this.map,
						this.player,
						this.gunbugBullets,
						this.uniqueID++
					)),
						this.enemies10.add(r);
				}, this),
				this.findObjectsByType('enemy11', this.map, 'objectsLayer').forEach(function (t) {
					(l = new FaceGame.Enemy11(
						this.game,
						t.x,
						t.y,
						'baker',
						this.map,
						this.player,
						this.uniqueID++
					)),
						this.enemies11.add(l);
				}, this),
				this.findObjectsByType('enemy12', this.map, 'objectsLayer').forEach(function (t) {
					(n = new FaceGame.Enemy12(
						this.game,
						t.x,
						t.y,
						'fatMan',
						this.map,
						this.player,
						this.uniqueID++
					)),
						this.enemies12.add(n);
				}, this),
				this.findObjectsByType('enemy13', this.map, 'objectsLayer').forEach(function (t) {
					(m = new FaceGame.Enemy13(
						this.game,
						t.x,
						t.y,
						'dust',
						this.map,
						this.player,
						this.dustBullets,
						this.uniqueID++
					)),
						this.enemies13.add(m);
				}, this),
				this.findObjectsByType('enemy14', this.map, 'objectsLayer').forEach(function (t) {
					var e = t.properties.smoking ? '_smoking' : '';
					(c = new FaceGame.Enemy14(
						this.game,
						t.x,
						t.y,
						'crab' + e,
						+t.properties.velocity,
						+t.properties.direction,
						+t.properties.distance,
						+t.properties.size,
						+t.properties.health,
						this.map,
						this.player,
						this.uniqueID++
					)),
						this.enemies14.add(c);
				}, this),
				this.findObjectsByType('enemy15', this.map, 'objectsLayer').forEach(function (t) {
					(d = new FaceGame.Enemy15(
						this.game,
						t.x,
						t.y,
						'gull',
						+t.properties.velocity,
						+t.properties.distance,
						this.gullDung,
						this.map,
						this.uniqueID++
					)),
						this.enemies15.add(d);
				}, this);
		},
		enemyKnockback: function (t, e) {
			this.slapSFX.play(),
				e.deflect(),
				t.x < e.x ? (t.body.velocity.x = -600) : (t.body.velocity.x = 600);
		},
		weaponKnockback: function (t, e) {
			var s = t ? -1 : 1;
			this.player.body.velocity.x = e * s;
		},
		jumpOnEnemy: function (t, e) {
			e.body.touching.up
				? (e.damage(1, 'jump'),
				  (t.body.velocity.y = -this.BOUNCING_SPEED),
				  this.player.customParams.invincible ||
						((this.player.customParams.secretInvincibility = !0),
						this.toggleInvincible(),
						this.game.time.events.add(50, this.toggleInvincible, this)))
				: !this.player.customParams.invincible && t.bottom - e.top > 20 && this.hitPlayer();
		},
		trueEnemyBullet: function (t, e) {
			e.kill(), this.hitPlayer();
		},
		shootEnemy: function (t, e) {
			var s;
			'crate_metal' == e.key || 'baker' == e.key
				? this.bulletDeflect(t, e)
				: 0 == t.customParams.timesCollided &&
				  ((s = t.body.velocity.x > 0 ? 'right' : 'left'),
				  t.kill(),
				  e.damage(t.damageDeal, 'shoot', s));
		},
		laserEnemy: function (t, e) {
			if ('baker' == e.key) this.bulletDeflect(t, e);
			else if ('crate_metal' == e.key);
			else {
				var s,
					i = !0,
					a = t.alreadyHitIDs,
					h = e.ID;
				a.forEach(function (t) {
					h == t && (i = !1);
				}),
					i &&
						((s = t.anchor.y > 0 ? 'right' : 'left'),
						a.push(h),
						e.damage(t.damageDeal, 'shoot', s));
			}
		},
		frisbeeEnemy: function (t, e) {
			if ('crate_metal' == e.key || 'baker' == e.key) this.bulletDeflect(t, e);
			else {
				var s,
					i = !0,
					a = t.lastEnemyHitID,
					h = e.ID;
				a == h && (i = !1),
					i &&
						0 == t.customParams.timesCollided &&
						(e.body.touching.up
							? t.body.velocity.x > 0
								? ((s = 'right'),
								  (t.body.velocity.x = 0.2 * -this.BULLET_SPEED),
								  (t.body.velocity.y = -70),
								  e.damage(t.damageDeal, 'jump', s))
								: ((s = 'left'),
								  (t.body.velocity.x = 0.2 * this.BULLET_SPEED),
								  (t.body.velocity.y = -70),
								  e.damage(t.damageDeal, 'jump', s))
							: t.body.velocity.x > 0
							? ((s = 'right'),
							  e.damage(t.damageDeal, 'jump', s),
							  (t.body.velocity.x = -1 * t.body.velocity.x))
							: ((s = 'left'),
							  e.damage(t.damageDeal, 'jump', s),
							  (t.body.velocity.x = -1 * t.body.velocity.x)),
						t.customParams.ableToReflect || (t.customParams.ableToReflect = !0),
						this.frisbeeThudSFX.play(),
						(t.lastEnemyHitID = h));
			}
		},
		kifliEnemy: function (t, e) {
			if ('baker' == e.key) this.bulletDeflect(t, e);
			else if ('crate_metal' == e.key);
			else {
				var s = !0,
					i = t.alreadyHitIDs,
					a = e.ID;
				i.forEach(function (t, e) {
					a == t.enem &&
						FaceGame.GameState.time.now < t.time + 200 &&
						((s = !1), (i[e] = { enem: a, time: FaceGame.GameState.time.now }));
				}),
					s && (e.damage(t.damageDeal, 'jump'), i.push({ enem: a, time: this.game.time.now }));
			}
		},
		reflectFrisbee: function (t, e) {
			e.customParams.ableToReflect &&
				((e.body.velocity.x = -1 * e.body.velocity.x),
				this.frisbeeThudSFX.play(),
				(e.lastEnemyHitID = null),
				(e.customParams.ableToReflect = !1));
		},
		createDonuts: function () {
			var t;
			this.findObjectsByType('donut', this.map, 'objectsLayer').forEach(function (e) {
				this.totalDonut++;
				var s = String(Math.round(1 + 4 * Math.random()));
				(t = new FaceGame.Donut(this.game, e.x, e.y, 'donut' + s, this.map)), this.donuts.add(t);
			}, this);
		},
		createBuzzsaws: function () {
			var t;
			this.findObjectsByType('buzzsaw', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Buzzsaw(
					this.game,
					e.x,
					e.y,
					+e.properties.velocity,
					+e.properties.distance,
					+e.properties.d2,
					e.properties.d2move,
					e.properties.clockwise,
					e.properties.direction,
					+e.properties.initial,
					e.properties.moving,
					this.map
				)),
					this.buzzsaws.add(t);
			}, this);
		},
		createPlatforms: function () {
			var t, e, s;
			this.findObjectsByType('platform', this.map, 'objectsLayer').forEach(function (e) {
				var s = 'up' == e.properties.direction ? '_updown' : '';
				(t = new FaceGame.Platform(
					this.game,
					e.x,
					e.y,
					'platform' + s,
					+e.properties.velocity,
					+e.properties.distance,
					e.properties.direction,
					+e.properties.initial,
					this.map,
					e.properties.switchTie,
					e.properties.on
				)),
					this.platforms.add(t);
			}, this),
				this.findObjectsByType('platformFalling', this.map, 'objectsLayer').forEach(function (t) {
					var s = 'false' == t.properties.fall ? '_square' : '_falling';
					(e = new FaceGame.PlatformFalling(
						this.game,
						t.x,
						t.y,
						'platform' + s,
						t.properties.fall,
						this.map,
						this.player
					)),
						this.platformsFalling.add(e);
				}, this),
				this.findObjectsByType('invisiblePlatform', this.map, 'objectsLayer').forEach(function (t) {
					var e = t.properties.theWidth || '25';
					(s = new FaceGame.InvisiblePlatform(
						this.game,
						t.x,
						t.y,
						'invisPlat' + e,
						+t.properties.theWidth,
						this.map
					)),
						this.invisiblePlatforms.add(s);
				}, this);
		},
		createConveyers: function () {
			var t;
			this.findObjectsByType('conveyer', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Conveyer(
					this.game,
					e.x,
					e.y,
					'conveyer',
					+e.properties.speed,
					e.properties.direction,
					e.properties.on,
					e.properties.switchTie,
					this.map
				)),
					this.conveyers.add(t);
			}, this);
		},
		createSwitches: function () {
			var t;
			this.findObjectsByType('switch', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Switch(
					this.game,
					e.x,
					e.y,
					'switch',
					+e.properties.speed,
					e.properties.direction,
					e.properties.groupToAffect,
					e.properties.switchTie,
					e.properties.secondGroupToAffect,
					this.map
				)),
					this.switches.add(t);
			}, this);
		},
		createNewSwitches: function () {
			var t;
			this.findObjectsByType('newSwitch', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.SwitchNew(
					this.game,
					e.x,
					e.y,
					'switch',
					e.properties.groupToAffect,
					e.properties.switchTie,
					e.properties.secondGroupToAffect,
					e.properties.switchType,
					e.properties.customFunction,
					e.properties.resetIndiana,
					this.map,
					this.uniqueID++
				)),
					this.newSwitches.add(t);
			}, this);
		},
		createButtons: function () {
			var t;
			this.findObjectsByType('button', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Button(
					this.game,
					e.x,
					e.y,
					'button',
					e.properties.groupToAffect,
					e.properties.switchTie,
					e.properties.secondGroupToAffect,
					e.properties.switchType,
					e.properties.customFunction,
					e.properties.oneTime,
					e.properties.resetIndiana,
					this.map
				)),
					this.buttons.add(t);
			}, this);
		},
		createDoors: function () {
			var t;
			this.findObjectsByType('door', this.map, 'objectsLayer').forEach(function (e) {
				var s = '';
				(s = e.properties.sideways ? 'doorSideways' : 'door'),
					e.properties.auto && (s = 'autoDoor'),
					e.properties.lol && (s = 'doorlol'),
					(t = new FaceGame.Door(
						this.game,
						e.x,
						e.y,
						s,
						e.properties.open,
						e.properties.switchTie,
						e.properties.sideways,
						e.properties.auto,
						e.properties.fishstick,
						e.properties.resetIndiana,
						this.map,
						this.player
					)),
					this.doors.add(t);
			}, this);
		},
		createThwomps: function () {
			var t;
			this.findObjectsByType('thwomp', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Thwomp(this.game, e.x, e.y, 'thwomp', this.map, this.player)),
					this.thwomps.add(t);
			}, this);
		},
		createBreadMakers: function () {
			var t, e;
			this.findObjectsByType('breadMaker', this.map, 'objectsLayer').forEach(function (s) {
				if (s.properties.smallStem) var i = 'pressChild2Small';
				else if (s.properties.xlStem) i = 'pressChildXL';
				else i = 'pressChild2';
				(e = new FaceGame.BreadMakerChild(this.game, s.x, s.y, i, this.map)),
					(t = new FaceGame.BreadMaker(
						this.game,
						s.x,
						s.y,
						'breadMaker',
						+s.properties.delayTime,
						s.properties.makeBread,
						this.loafs,
						s.properties.smallStem,
						s.properties.xlStem,
						this.map,
						this.player
					)),
					(e.parentPress = t),
					this.breadMakerChilds.add(e),
					this.breadMakers.add(t);
			}, this);
		},
		createFires: function () {
			var t;
			this.findObjectsByType('fire', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Fire(
					this.game,
					e.x,
					e.y,
					'fire',
					e.properties.slowBurn,
					+e.properties.delayTime,
					e.properties.halfSize,
					e.properties.direction,
					this.map
				)),
					this.fires.add(t);
			}, this);
		},
		createElevators: function () {
			var t,
				e = this.findObjectsByType('elevator', this.map, 'objectsLayer');
			if ('levelR' == this.currentLevel || 'levelAA' == this.currentLevel) var s = 'zElevator';
			else s = 'elevator';
			e.forEach(function (e) {
				(t = new FaceGame.Elevator(
					this.game,
					e.x,
					e.y,
					s,
					this.map,
					+e.properties.distance,
					this.player
				)),
					this.elevators.add(t);
			}, this);
		},
		createChainLifts: function () {
			var t;
			this.findObjectsByType('chainLift', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.ChainLift(
					this.game,
					e.x,
					e.y,
					'chainLift',
					this.map,
					+e.properties.distance,
					this.player
				)).addChild(this.game.make.sprite(-57, 0, 'chainLiftChild')),
					t.addChild(this.game.make.sprite(57, 0, 'chainLiftChild')),
					t.children[0].anchor.setTo(0.5, 1),
					t.children[1].anchor.setTo(0.5, 1),
					t.children[0].scale.setTo(1, (e.y - (e.y - e.properties.distance)) / 200),
					t.children[1].scale.setTo(1, (e.y - (e.y - e.properties.distance)) / 200),
					this.chainLifts.add(t);
			}, this);
		},
		createSpringLaunchers: function () {
			var t;
			this.findObjectsByType('springLauncher', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.SpringLauncher(
					this.game,
					e.x,
					e.y,
					'springLauncher',
					this.map,
					+e.properties.launchSpeed,
					this.player
				)),
					this.springLaunchers.add(t);
			}, this);
		},
		createRealBigFishs: function () {
			var t;
			this.findObjectsByType('realBigFish', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.RealBigFish(this.game, e.x, e.y, 'realBigFish', this.map, this.player)),
					this.realBigFishs.add(t);
			}, this);
		},
		createZTrapGates: function () {
			var t;
			this.findObjectsByType('zTrapGate', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.ZTrapGate(this.game, e.x, e.y, 'zTrapGate', this.map, this.player)),
					this.zTrapGates.add(t);
			}, this);
		},
		createSecretCharacters: function () {
			var t;
			this.findObjectsByType('secretCharacter', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.SecretCharacter(
					this.game,
					e.x,
					e.y,
					e.properties.name,
					this.map,
					this.player
				)),
					this.secretCharacters.add(t);
			}, this);
		},
		createEndChars: function () {
			var t,
				e = 1;
			this.findObjectsByType('endChar', this.map, 'objectsLayer').forEach(function (s) {
				this.characterArray.length > e &&
					(((t = new FaceGame.SecretCharacter(
						this.game,
						s.x,
						s.y,
						this.characterArray[e],
						this.map,
						this.player
					)).customParams.got = !0),
					(t.body.velocity.y = -100),
					(t.body.gravity.y = this.GAME_GRAVITY),
					this.endChars.add(t),
					e++);
			}, this);
		},
		createHealths: function () {
			var t;
			this.findObjectsByType('health', this.map, 'objectsLayer').forEach(function (e) {
				var s = e.properties.full ? '2' : '1';
				(t = new FaceGame.Health(this.game, e.x, e.y, 'health' + s, this.map, e.properties.full)),
					this.healths.add(t);
			}, this);
		},
		createWeapons: function () {
			var t;
			this.findObjectsByType('weapon', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Weapon(
					this.game,
					e.x,
					e.y,
					'powerupItem',
					this.map,
					e.properties.name,
					+e.properties.index
				)),
					this.weapons.add(t);
			}, this);
		},
		createHotSauces: function () {
			var t;
			this.findObjectsByType('hotSauce', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.HotSauce(this.game, e.x, e.y, 'hotSauce', this.map)),
					this.hotSauces.add(t);
			}, this);
		},
		createPills: function () {
			var t;
			this.findObjectsByType('pills', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Pill(this.game, e.x, e.y, 'pills', this.map)), this.pills.add(t);
			}, this);
		},
		createAmmos: function () {
			var t;
			this.findObjectsByType('ammo', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Ammo(this.game, e.x, e.y, 'ammo', this.map)), this.ammos.add(t);
			}, this);
		},
		createSpikes: function () {
			var t;
			this.findObjectsByType('spike', this.map, 'objectsLayer').forEach(function (e) {
				var s = e.properties.falling ? 'Falling' : '';
				(t = new FaceGame.Spike(
					this.game,
					e.x,
					e.y,
					'spike' + s,
					e.properties.direction,
					e.properties.falling,
					this.player,
					this.map
				)),
					this.spikes.add(t);
			}, this);
		},
		createCrates: function () {
			var t;
			this.findObjectsByType('crate', this.map, 'objectsLayer').forEach(function (e) {
				var s = e.properties.metal ? '_metal' : '';
				(t = new FaceGame.Crate(
					this.game,
					e.x,
					e.y,
					'crate' + s,
					this.map,
					this.player,
					+e.properties.size,
					e.properties.metal,
					this.collisionLayer,
					e.properties.resetIndiana,
					this.uniqueID++
				)),
					this.crates.add(t);
			}, this);
		},
		createHatches: function () {
			var t;
			this.findObjectsByType('hatch', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Hatch(
					this.game,
					e.x,
					e.y,
					'hatch',
					this.map,
					e.properties.open,
					+e.properties.switchTie,
					this.collisionLayer
				)),
					this.hatches.add(t);
			}, this);
		},
		createPumpkins: function () {
			var t;
			this.findObjectsByType('pumpkin1', this.map, 'objectsDecorationLayer').forEach(function (e) {
				(t = new FaceGame.Pumpkin(this.game, e.x, e.y, 'pumpkin_sketch', this.map)),
					this.pumpkins.add(t);
			}, this);
		},
		createCheckpoints: function () {
			var t;
			this.findObjectsByType('checkpoint', this.map, 'objectsLayer').forEach(function (e) {
				(t = new FaceGame.Checkpoint(
					this.game,
					e.x,
					e.y,
					null,
					this.map,
					e.properties.activateDirection,
					this.player,
					e.properties.resetIndiana
				)),
					this.checkpoints.add(t);
			}, this);
		},
		killPlayer: function (t, e) {
			'up' == e.customParams.direction
				? e.body.touching.up && this.hitPlayer()
				: 'left' == e.customParams.direction
				? e.body.touching.left && this.hitPlayer()
				: 'right' == e.customParams.direction
				? e.body.touching.right && this.hitPlayer()
				: 'down' == e.customParams.direction &&
				  e.body.touching.down &&
				  e.customParams.timesCollided < 1 &&
				  (this.hitPlayer(), e.customParams.fallActivated && e.kill());
		},
		loafEnemy: function (t, e) {
			e.customParams.painful &&
				!e.customParams.loafedEnemy &&
				((e.customParams.loafedEnemy = !0), t.damage(1));
		},
		playerInFire: function (t, e) {
			e.customParams.painful && !t.customParams.hotSauce && this.hitPlayer();
		},
		igniteLoaf: function (t, e) {
			t.customParams.painful && !e.customParams.painful && e.ignite();
		},
		hitPlayer: function () {
			if (!this.player.customParams.invincible && !this.player.customParams.disBoiDed)
				if (this.player.customParams.hasHat && 0 == this.lostHat)
					this.playerHurtSFX.play(),
						(this.hat.body.allowGravity = !0),
						(this.hat.body.gravity.y = this.GAME_GRAVITY),
						(this.hat.body.velocity.y = -300),
						(this.hat.body.velocity.x = -129),
						(this.hatSpin = !0),
						this.toggleInvincible(),
						this.game.time.events.add(2e3, this.toggleInvincible, this),
						(this.lostHat = !0),
						(this.player.customParams.hasHat = !1),
						this.game.time.events.add(300, this.toggleLostHat, this);
				else if (this.player.customParams.health > 0) {
					this.playerHurtSFX.play(), this.player.customParams.health--;
					for (var t = 0; t < this.player.customParams.maxHealth; t++)
						t < this.player.customParams.health
							? this.healthIcons[t].loadTexture('healthHUD1')
							: this.healthIcons[t].loadTexture('healthHUD2');
					this.toggleInvincible(),
						this.game.time.events.add(2e3, this.toggleInvincible, this),
						(this.player.body.velocity.x = 0.25 * this.player.body.velocity.x),
						(this.player.body.velocity.y = 0.25 * this.player.body.velocity.y);
				} else this.gameOver();
		},
		toggleInvincible: function () {
			0 == this.player.customParams.invincibleTimer &&
				((this.player.customParams.invincible = !this.player.customParams.invincible),
				this.player.customParams.secretInvincibility &&
					!this.player.customParams.invincible &&
					(this.player.customParams.secretInvincibility = !1));
		},
		toggleLostHat: function () {
			this.lostHat = !1;
		},
		gameOver: function (t) {
			if (!this.player.customParams.disBoiDed) {
				(this.player.customParams.disBoiDed = !0), this.levelMusic.stop();
				var e = 'level' + this.levelData.number;
				this.deathTracker[e]++,
					this.deathTracker.total++,
					localStorage.setItem('DBdeathTracker', JSON.stringify(this.deathTracker)),
					this.player.body.moves && this.deadNoise.play(),
					(this.deathEmitter.x = this.player.x),
					(this.deathEmitter.y = this.player.y),
					(this.player.alpha = 0),
					(this.player.body.moves = !1),
					this.deathEmitter.start(!0, 4e3, null, 15),
					this.player.customParams.hasHat &&
						((this.hat.body.allowGravity = !0),
						(this.hat.body.gravity.y = this.GAME_GRAVITY),
						(this.hat.body.velocity.y = -300),
						(this.hat.body.velocity.x = -129),
						(this.hatSpin = !0),
						(this.player.customParams.hasHat = !1)),
					this.player.customParams.hotSauce && this.hotSaucePowerDeactivate(),
					this.player.customParams.invincibleTimer > 0 && this.pillPowerDeactivate(),
					(this.shouldDie = !0),
					(this.respawnX = 0),
					(this.respawnY = 0),
					(this.resetLastSection = !1);
				for (var s = this.checkpoints.children.length - 1; s >= 0; s--)
					this.checkpoints.children[s].checkpoint_reached &&
						((this.respawnX = this.checkpoints.children[s].x),
						(this.respawnY = this.checkpoints.children[s].y),
						(this.shouldDie = !1),
						this.checkpoints.children[s].resetIndiana && (this.resetLastSection = !0),
						(s = -1));
				this.game.time.events.add(
					4e3,
					function () {
						if (this.shouldDie)
							this.game.state.start('Game', !0, !1, this.levelData.selfRef),
								this.deadNoise.stop(),
								(this.player.customParams.disBoiDed = !1);
						else {
							(this.player.customParams.health = this.player.customParams.maxHealth),
								(this.healthLabel.text = 'Health: ');
							for (var t = 0; t < this.player.customParams.maxHealth; t++)
								t < this.player.customParams.health
									? this.healthIcons[t].loadTexture('healthHUD1')
									: this.healthIcons[t].loadTexture('healthHUD2');
							if (
								(this.stopSFXBeforeChange(),
								this.levelMusic.play(),
								(this.player.body.velocity.x = 0),
								(this.player.body.velocity.y = 0),
								this.toggleInvincible(),
								this.game.time.events.add(2e3, this.toggleInvincible, this),
								(this.player.x = this.respawnX),
								(this.player.y = this.respawnY - 40),
								(this.player.alpha = 1),
								this.platformsFalling.children.length > 0)
							)
								for (t = 0; t < this.platformsFalling.children.length; t++)
									this.platformsFalling.children[t].customParams.helpIveFallenAndICantGetUp &&
										this.platformsFalling.children[t].resetThePlat();
							(this.player.body.moves = !0),
								this.game.time.events.add(
									100,
									function () {
										this.player.customParams.disBoiDed = !1;
									},
									this
								),
								(this.player.customParams.touchingPress = !1),
								this.resetLastSection && this.resetIndiana();
						}
					},
					this
				);
			}
		},
		createOnscreenControls: function () {
			(this.leftArrow = this.add.button(30, this.game.height - 100, 'leftButton')),
				(this.rightArrow = this.add.button(150, this.game.height - 100, 'rightButton')),
				(this.actionButton = this.add.button(
					this.game.width - 120,
					this.game.height - 100,
					'jumpButton'
				)),
				(this.shootButton = this.add.button(
					this.game.width - 120,
					this.game.height - 200,
					'shootButton'
				)),
				(this.leftArrow.alpha = 0.5),
				(this.rightArrow.alpha = 0.5),
				(this.actionButton.alpha = 0.5),
				(this.shootButton.alpha = 0.5),
				(this.leftArrow.fixedToCamera = !0),
				(this.rightArrow.fixedToCamera = !0),
				(this.actionButton.fixedToCamera = !0),
				(this.shootButton.fixedToCamera = !0),
				this.actionButton.events.onInputDown.add(function () {
					this.player.customParams.mustJump = !0;
				}, this),
				this.actionButton.events.onInputUp.add(function () {
					this.player.customParams.mustJump = !1;
				}, this),
				this.actionButton.events.onInputOver.add(function () {
					this.player.customParams.mustJump = !0;
				}, this),
				this.actionButton.events.onInputOut.add(function () {
					this.player.customParams.mustJump = !1;
				}, this),
				this.leftArrow.events.onInputDown.add(function () {
					this.player.customParams.isMovingLeft = !0;
				}, this),
				this.leftArrow.events.onInputUp.add(function () {
					this.player.customParams.isMovingLeft = !1;
				}, this),
				this.leftArrow.events.onInputOver.add(function () {
					this.player.customParams.isMovingLeft = !0;
				}, this),
				this.leftArrow.events.onInputOut.add(function () {
					this.player.customParams.isMovingLeft = !1;
				}, this),
				this.rightArrow.events.onInputDown.add(function () {
					this.player.customParams.isMovingRight = !0;
				}, this),
				this.rightArrow.events.onInputUp.add(function () {
					this.player.customParams.isMovingRight = !1;
				}, this),
				this.rightArrow.events.onInputOver.add(function () {
					this.player.customParams.isMovingRight = !0;
				}, this),
				this.rightArrow.events.onInputOut.add(function () {
					this.player.customParams.isMovingRight = !1;
				}, this),
				this.shootButton.events.onInputDown.add(this.createPlayerBullet, this);
		}
	}),
	((FaceGame = FaceGame || {}).GraveGhost = function (t, e, s, i) {
		Phaser.Sprite.call(this, t, e, s, 'graveGhost'),
			(this.game = t),
			(this.player = i),
			this.anchor.setTo(0.5),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x,
				yMod: -200,
				xMod: -200,
				state: 'default'
			}),
			this.game.physics.arcade.enableBody(this),
			(this.fixedToCamera = !0),
			(this.alpha = 0.6),
			(this.defaultAnim = this.animations.add('ghost_default', [0, 1], 2, !0)),
			(this.sadAnim = this.animations.add('ghost_sad', [3, 4], 4, !0)),
			this.defaultAnim.play();
	}),
	(FaceGame.GraveGhost.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.GraveGhost.prototype.constructor = FaceGame.GraveGhost),
	(FaceGame.GraveGhost.prototype.update = function () {
		if ('betrayed' == this.customParams.state) this.cameraOffset.x -= 1;
		else if ('sad' == this.customParams.state)
			(this.cameraOffset.y =
				15 * Math.cos((2 * this.customParams.moveEight) / 23) +
				this.customParams.originalY +
				this.customParams.yMod),
				(this.customParams.moveEight = this.customParams.moveEight + 0.5),
				(this.cameraOffset.x -= 2),
				this.x - this.game.camera.x < -300 &&
					((this.customParams.yMod = 400),
					(this.customParams.xMod = -200),
					(this.y = this.player.y),
					this.sadAnim.stop(),
					this.defaultAnim.play(),
					(this.customParams.state = 'default'));
		else {
			var t = this.y - this.player.y;
			(this.cameraOffset.y =
				20 * Math.cos((2 * this.customParams.moveEight) / 47) +
				this.customParams.originalY +
				this.customParams.yMod),
				(this.customParams.moveEight = this.customParams.moveEight + 0.5),
				this.player.customParams.disBoiDed || (this.cameraOffset.x = this.customParams.xMod),
				(this.customParams.xMod += 0.2),
				t < -10 ? (this.customParams.yMod += 0.3) : t > 10 && (this.customParams.yMod -= 0.3);
		}
	}),
	(FaceGame.GraveGhost.prototype.betrayed = function () {
		(this.customParams.state = 'betrayed'),
			this.defaultAnim.stop(),
			(this.frame = 2),
			this.game.time.events.add(
				1e3,
				function () {
					this.sad();
				},
				this
			);
	}),
	(FaceGame.GraveGhost.prototype.sad = function () {
		(this.customParams.state = 'sad'), this.sadAnim.play();
	}),
	((FaceGame = FaceGame || {}).GullDung = function (t, e, s) {
		Phaser.Sprite.call(this, t, e, s, 'gullDung'),
			(this.game = t),
			this.game.physics.arcade.enableBody(this),
			this.anchor.setTo(0.5),
			(this.body.velocity.y = 100);
	}),
	(FaceGame.GullDung.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.GullDung.prototype.constructor = FaceGame.GullDung),
	(FaceGame.GullDung.prototype.update = function () {
		this.y > this.game.camera.y + this.game.camera.height + 50 && this.kill();
	}),
	((FaceGame = FaceGame || {}).GunbugBullet = function (t, e, s) {
		Phaser.Sprite.call(this, t, e, s, 'gunbug_bullet'),
			(this.game = t),
			this.game.physics.arcade.enableBody(this),
			this.anchor.setTo(0.5),
			this.scale.setTo(3);
	}),
	(FaceGame.GunbugBullet.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.GunbugBullet.prototype.constructor = FaceGame.GunbugBullet),
	(FaceGame.GunbugBullet.prototype.update = function () {
		(this.x < this.game.camera.x - 100 ||
			this.x > this.game.camera.x + this.game.camera.width + 100) &&
			this.kill();
	}),
	((FaceGame = FaceGame || {}).Hatch = function (t, e, s, i, a, h, o, r) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.layer = r),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5, 0),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			h
				? ((this.frame = 1),
				  (this.body.checkCollision.up = !1),
				  (this.body.checkCollision.down = !1),
				  (this.body.checkCollision.left = !1),
				  (this.body.checkCollision.right = !1),
				  this.body.setSize(100, 50))
				: ((this.frame = 0), this.body.setSize(100, 16)),
			(this.customParams = { open: !!h, switchTie: o }),
			(this.break = this.game.add.audio('HatchBreak')),
			(this.break.volume = 0.2),
			(this.autoCull = !0);
	}),
	(FaceGame.Hatch.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Hatch.prototype.constructor = FaceGame.Hatch),
	(FaceGame.Hatch.prototype.update = function () {}),
	(FaceGame.Hatch.prototype.openClose = function () {
		this.customParams.open
			? ((this.customParams.open = !1),
			  (this.frame = 0),
			  this.body.setSize(100, 16),
			  (this.body.checkCollision.up = !0),
			  (this.body.checkCollision.down = !0))
			: ((this.customParams.open = !0),
			  (this.frame = 1),
			  (this.body.checkCollision.up = !1),
			  (this.body.checkCollision.down = !1),
			  (this.body.checkCollision.left = !1),
			  (this.body.checkCollision.right = !1),
			  this.body.setSize(100, 50));
	}),
	((FaceGame = FaceGame || {}).Health = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.x = Math.round(e)),
			(this.y = Math.round(s));
		var o = this.y;
		this.game.physics.arcade.enableBody(this),
			(this.body.checkCollision.up = !1),
			(this.body.allowGravity = !1),
			this.scale.setTo(1),
			(this.fullHeal = h),
			(this.itemTween = this.game.add.tween(this)),
			this.itemTween
				.to({ y: o - 5 }, 700)
				.to({ y: o }, 700)
				.loop()
				.start(),
			(this.autoCull = !0);
	}),
	(FaceGame.Health.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Health.prototype.constructor = FaceGame.Health),
	(FaceGame.Health.prototype.update = function () {}),
	((FaceGame = FaceGame || {}).HotSauce = function (t, e, s, i, a) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.x = Math.round(e)),
			(this.y = Math.round(s));
		var h = this.y;
		this.game.physics.arcade.enableBody(this),
			(this.body.checkCollision.up = !1),
			(this.body.allowGravity = !1),
			this.scale.setTo(0.4),
			(this.itemTween = this.game.add.tween(this)),
			this.itemTween
				.to({ y: h - 5 }, 700)
				.to({ y: h }, 700)
				.loop()
				.start(),
			(this.autoCull = !0);
	}),
	(FaceGame.HotSauce.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.HotSauce.prototype.constructor = FaceGame.HotSauce),
	(FaceGame.HotSauce.prototype.update = function () {}),
	((FaceGame = FaceGame || {}).IndianaRoll = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.player = h),
			this.game.physics.arcade.enableBody(this),
			(this.body.gravity.y = 0),
			this.body.bounce.setTo(0.5),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moving: !1,
				topSpeed: !1,
				activated: !1,
				hitTheWall: !1,
				endOfStuff: !1
			}),
			(this.rollingSFX = this.game.add.audio('indianaRollingSFX')),
			(this.rollingSFX.volume = 0.8),
			(this.rollingSFX.loop = !0),
			(this.boomSFX = this.game.add.audio('indianaBoomSFX')),
			(this.boomSFX.volume = 0.8);
	}),
	(FaceGame.IndianaRoll.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.IndianaRoll.prototype.constructor = FaceGame.IndianaRoll),
	(FaceGame.IndianaRoll.prototype.update = function () {
		this.player.x > this.x + 0.5 * this.width &&
			!this.customParams.activated &&
			(this.activate(), (this.customParams.activated = !0), FaceGame.GameState.activateIndiana()),
			(!this.body.touching.down && !this.body.blocked.down) ||
				this.customParams.moving ||
				((this.customParams.moving = !0), this.rollingSFX.play()),
			!this.customParams.moving ||
				this.customParams.topSpeed ||
				this.customParams.hitTheWall ||
				(this.body.velocity.x < 60
					? ((this.body.velocity.x += 0.8), (this.angle += 0.4))
					: this.body.velocity.x >= 60 && ((this.body.velocity.x += 1.8), (this.angle += 0.8)),
				this.body.velocity.x >= 140 &&
					((this.body.velocity.x = 140), (this.customParams.topSpeed = !0))),
			this.customParams.topSpeed && !this.customParams.hitTheWall && (this.angle += 1),
			this.body.blocked.right &&
				((this.customParams.hitTheWall = !0),
				(this.body.immovable = !0),
				this.rollingSFX.stop(),
				this.boomSFX.play()),
			this.customParams.hitTheWall &&
				!this.customParams.endOfStuff &&
				(this.body.velocity.x <= -50
					? ((this.body.velocity.x += 0.8), (this.angle -= 0.8))
					: this.body.velocity.x <= -30
					? ((this.body.velocity.x += 0.4), (this.angle -= 0.5))
					: this.body.velocity.x < 0
					? ((this.body.velocity.x += 0.2), (this.angle -= 0.1))
					: this.body.velocity.x >= 0 &&
					  ((this.body.velocity.x = 0), (this.customParams.endOfStuff = !0))),
			!this.player.customParams.disBoiDed &&
				this.customParams.activated &&
				!this.customParams.hitTheWall &&
				this.x > this.player.x &&
				FaceGame.GameState.gameOver();
	}),
	(FaceGame.IndianaRoll.prototype.activate = function () {
		(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.velocity.y = 115);
	}),
	((FaceGame = FaceGame || {}).InvisiblePlatform = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = h),
			this.anchor.setTo(0.5, 1),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			(this.body.checkCollision.down = !1),
			(this.body.checkCollision.left = !1),
			(this.body.checkCollision.right = !1);
	}),
	(FaceGame.InvisiblePlatform.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.InvisiblePlatform.prototype.constructor = FaceGame.InvisiblePlatform),
	(FaceGame.InvisiblePlatform.prototype.update = function () {}),
	((FaceGame = FaceGame || {}).Kifli = function (t, e, s, i) {
		Phaser.Sprite.call(this, t, e, s, 'kifli'),
			(this.game = t),
			(this.player = i),
			this.anchor.setTo(0.5),
			this.scale.setTo(0.6),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				timesCollided: 0,
				activatedSwitch: !1,
				completedPath: !1,
				collided: !1,
				killTimer: 0
			});
		var a = this.player.customParams.facingRight ? 1 : -1;
		(this.accuracy = 0.01),
			(this.p0 = { x: this.player.x + 10 * a, y: this.player.y + 10 }),
			(this.p1 = { x: this.player.x + 450 * a, y: this.player.y - 200 }),
			(this.p2 = { x: this.player.x + 460 * a, y: this.player.y + 200 }),
			(this.p3 = { x: this.player.x, y: this.player.y }),
			(this.wooshSFX = this.game.add.audio('wooshSFX')),
			(this.wooshSFX.volume = 0.2),
			(this.wooshSFX.loop = !0),
			(this.alreadyHitIDs = []);
	}),
	(FaceGame.Kifli.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Kifli.prototype.constructor = FaceGame.Kifli),
	(FaceGame.Kifli.prototype.update = function () {
		if (
			!this.customParams.completedPath &&
			this.accuracy < 0.99 &&
			this.alive &&
			!this.customParams.collided
		) {
			(this.angle = this.angle + 15), (this.p3 = { x: this.player.x, y: this.player.y });
			var t = this.bezier(this.accuracy, this.p0, this.p1, this.p2, this.p3);
			(this.x = t.x),
				(this.y = t.y),
				(this.accuracy += 0.01),
				this.accuracy >= 0.99 &&
					((this.customParams.completedPath = !0),
					this.kill(),
					this.wooshSFX.stop(),
					this.player.body.moves &&
						(this.game.state.callbackContext.eatSFX.play(),
						(this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
						this.enemyEmitter.makeParticles([
							'crumb1',
							'crumb2',
							'crumb3',
							'crumb4',
							'crumb5',
							'crumb6'
						]),
						this.game.physics.arcade.enable(this.enemyEmitter),
						(this.enemyEmitter.minParticleScale = 0.5),
						(this.enemyEmitter.maxParticleScale = 0.5),
						(this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
						this.enemyEmitter.setYSpeed(-250, 250),
						this.enemyEmitter.setXSpeed(-250, 250),
						this.enemyEmitter.start(!0, 1e3, null, 8)));
		} else !this.alive && this.wooshSFX.isPlaying && this.wooshSFX.stop();
		(this.x < this.game.camera.x - 200 ||
			this.x > this.game.camera.x + this.game.camera.width + 200) &&
			(this.kill(), this.wooshSFX.stop()),
			this.customParams.collided &&
				(this.customParams.killTimer++, this.customParams.killTimer >= 30 && this.kill());
	}),
	(FaceGame.Kifli.prototype.bezier = function (t, e, s, i, a) {
		var h = 3 * (s.x - e.x),
			o = 3 * (i.x - s.x) - h,
			r = a.x - e.x - h - o,
			l = 3 * (s.y - e.y),
			n = 3 * (i.y - s.y) - l,
			m = a.y - e.y - l - n;
		return {
			x: r * Math.pow(t, 3) + o * Math.pow(t, 2) + h * t + e.x,
			y: m * Math.pow(t, 3) + n * Math.pow(t, 2) + l * t + e.y
		};
	}),
	(FaceGame.Kifli.prototype.collided = function () {
		(this.customParams.collided = !0),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			this.wooshSFX.stop();
		var t = 600 * Math.random() - 200;
		this.body.velocity.y = -t;
		var e = 20 + 330 * Math.random();
		this.body.velocity.x = e;
	}),
	((FaceGame = FaceGame || {}).Loaf = function (t, e, s) {
		Phaser.Sprite.call(this, t, e, s, 'loaf'),
			(this.game = t),
			this.game.physics.arcade.enableBody(this),
			this.anchor.setTo(0.5),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.frame = 0),
			this.body.setSize(60, 33, 0, 33),
			(this.customParams = { painful: !1, loafedEnemy: !1 }),
			(this.onFireAnim = this.animations.add('onFire', [1, 2], 15, !0));
	}),
	(FaceGame.Loaf.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Loaf.prototype.constructor = FaceGame.Loaf),
	(FaceGame.Loaf.prototype.update = function () {
		if (this.bottom + 4 >= this.game.world.height) {
			if (!this.alive) return;
			this.kill();
		}
	}),
	(FaceGame.Loaf.prototype.ignite = function () {
		(this.customParams.painful = !0), this.onFireAnim.play(), this.body.setSize(50, 79, 0, 10);
	}),
	(FaceGame.Loaf.prototype.resetToNew = function () {
		this.body.setSize(60, 33, 0, 33),
			(this.customParams.painful = !1),
			this.onFireAnim.stop(),
			(this.frame = 0),
			(this.customParams.loafedEnemy = !1);
	}),
	((FaceGame = FaceGame || {}).MenuState = {
		create: function () {
			this.game.world.setBounds(0, 0, FaceGame.dim.w, FaceGame.dim.h),
				(this.menuMusic = this.game.add.audio('menuMusic')),
				(this.menuMusic.volume = 0.2),
				(this.menuMusic.loop = !0),
				(this.menuChangeSFX = this.game.add.audio('weaponChangeSFX')),
				(this.menuChangeSFX.volume = 0.2),
				(this.letsGoSFX = this.game.add.audio('letsGoSFX')),
				(this.letsGoSFX.volume = 0.8),
				(this.yaySFX = this.game.add.audio('yay')),
				(this.yaySFX.volume = 0.2),
				(this.badSpeakSFX = this.game.add.audio('badSpeak')),
				(this.badSpeakSFX.volume = 0.2),
				(this.secretBellSFX = this.game.add.audio('checkpointBellSFX')),
				(this.secretBellSFX.volume = 0.5),
				(this.donutboyIntroMusic = this.game.add.audio('donutboyIntro')),
				(this.donutboyIntroMusic.volume = 0.4),
				(this.donutboyMusic = this.game.add.audio('donutboy')),
				(this.donutboyMusic.volume = 0.4),
				(this.donutboyMusic.loop = !0),
				(this.cursors = this.game.input.keyboard.createCursorKeys()),
				(this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z)),
				(this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)),
				this.loadStatsAndData();
			var t = this.add.sprite(0, 0, 'menuBG');
			(t.width = this.game.world.width), (t.height = this.game.world.height);
			var e = this.game.add.emitter(this.game.world.centerX, 0, 400);
			e.makeParticles(['donut1_black', 'donut2_black', 'donut3_black']),
				this.game.physics.arcade.enable(e),
				(e.width = this.game.world.width),
				e.setYSpeed(30, 90),
				e.setXSpeed(-5, 5),
				(e.minParticleScale = 0.02),
				(e.maxParticleScale = 0.05),
				(e.gravity = 0);
			var s = this.add.sprite(0, 0, 'menuFG');
			(s.width = this.game.world.width), (s.height = this.game.world.height);
			var i = this.game.add.sprite(500, this.game.world.height / 2, 'factoryHoleBG');
			i.anchor.setTo(0.5), i.scale.setTo(0.6);
			var a = this.game.add.emitter(i.x - 0.28 * i.width, i.y + 0.4 * i.height, 400);
			a.makeParticles(['donut1', 'donut2', 'donut3', 'donut4', 'donut5']),
				this.game.physics.arcade.enable(a),
				a.setYSpeed(-350, -250),
				a.setXSpeed(-150, 0),
				(a.minParticleScale = 0.09),
				(a.maxParticleScale = 0.11);
			var h = this.game.add.emitter(i.x - 0.28 * i.width, i.y + 0.4 * i.height, 400);
			h.makeParticles([
				'zach',
				'sam',
				'abdullah',
				'kelly',
				'piggy',
				'jon',
				'pargo',
				'pup',
				'safety cap'
			]),
				this.game.physics.arcade.enable(h),
				h.setYSpeed(-280, -200),
				h.setXSpeed(-115, -1),
				(h.minParticleScale = 0.33),
				(h.maxParticleScale = 0.33),
				(h.gravity = 0),
				(this.peopleEmitter = h);
			var o = this.game.add.sprite(500, this.game.world.height / 2, 'factory');
			o.anchor.setTo(0.5),
				o.scale.setTo(0.6),
				(o.firstAnim = o.animations.add('factoryAnim1', [0, 1, 2], 2, !0)),
				(o.secondAnim = o.animations.add('factoryAnim2', [3, 4, 5], 2, !0)),
				o.firstAnim.play();
			var r = this.game.add.sprite(o.x - 0.35 * o.width, o.y + 10, 'kaboom');
			(r.alpha = 0), r.anchor.setTo(0.5, 0.5), r.scale.setTo(1);
			var l = r.animations.add('boom', null, 30);
			if (
				((l.killOnComplete = !0),
				this.donutboyIntroMusic.onStop.addOnce(function () {
					this.donutboyMusic.play(),
						(r.alpha = 1),
						l.play('boom'),
						o.firstAnim.destroy(),
						o.secondAnim.play(),
						a.start(!1, 1600, 10, 0),
						h.start(!1, 0, 1e3, 0),
						this.game.time.events.add(
							3300,
							function () {
								e.start(!1, 2600, 10, 0);
							},
							this
						);
				}, this),
				(this.dLabel = this.game.add.text(22, 40, 'Damon Bolesta is', {
					font: '25px VT323',
					fill: '#ffffff'
				})),
				this.dLabel.anchor.setTo(0, 0.5),
				(this.dLabel.stroke = '#000000'),
				(this.dLabel.strokeThickness = 2),
				(this.nameLabel = this.game.add.text(-530, 140, 'Donut\nBoy', {
					font: '70px D04b30',
					fill: '#ffffff'
				})),
				this.nameLabel.anchor.setTo(0, 0.5),
				(this.nameLabel.stroke = '#000000'),
				(this.nameLabel.strokeThickness = 4),
				(this.nameLabel.lineSpacing = -5),
				(this.menuState = 0),
				(this.menuPosition = 0),
				(this.maxMenuPositions = 0),
				(this.deleteConfirm = !1),
				(this.deleteConfirmOption = 0),
				(this.menuOptionLabel0 = this.game.add.text(65, this.game.world.height - 200, '', {
					font: '25px VT323',
					fill: '#fff'
				})),
				this.menuOptionLabel0.anchor.setTo(0, 0.5),
				(this.menuOptionLabel0.stroke = '#000000'),
				(this.menuOptionLabel0.strokeThickness = 2),
				(this.menuOptionLabel1 = this.game.add.text(65, this.game.world.height - 170, '', {
					font: '25px VT323',
					fill: '#fff'
				})),
				this.menuOptionLabel1.anchor.setTo(0, 0.5),
				(this.menuOptionLabel1.stroke = '#000000'),
				(this.menuOptionLabel1.strokeThickness = 2),
				(this.menuOptionLabel2 = this.game.add.text(65, this.game.world.height - 140, '', {
					font: '25px VT323',
					fill: '#fff'
				})),
				this.menuOptionLabel2.anchor.setTo(0, 0.5),
				(this.menuOptionLabel2.stroke = '#000000'),
				(this.menuOptionLabel2.strokeThickness = 2),
				(this.menuOptionLabel3 = this.game.add.text(65, this.game.world.height - 110, '', {
					font: '25px VT323',
					fill: '#fff'
				})),
				this.menuOptionLabel3.anchor.setTo(0, 0.5),
				(this.menuOptionLabel3.stroke = '#000000'),
				(this.menuOptionLabel3.strokeThickness = 2),
				(this.menuOptionLabel4 = this.game.add.text(65, this.game.world.height - 80, '', {
					font: '25px VT323',
					fill: '#fff'
				})),
				this.menuOptionLabel4.anchor.setTo(0, 0.5),
				(this.menuOptionLabel4.stroke = '#000000'),
				(this.menuOptionLabel4.strokeThickness = 2),
				(this.menuOptionLabel5 = this.game.add.text(65, this.game.world.height - 50, '', {
					font: '25px VT323',
					fill: '#fff'
				})),
				this.menuOptionLabel5.anchor.setTo(0, 0.5),
				(this.menuOptionLabel5.stroke = '#000000'),
				(this.menuOptionLabel5.strokeThickness = 2),
				(this.menuArrow = this.add.sprite(45, this.menuOptionLabel0.y - 8, 'menuArrow')),
				this.menuArrow.scale.setTo(0.3),
				(this.menuArrow.alpha = 0),
				this.game.device.desktop
					? ((this.menuOptionLabel2.text = 'Press Enter'),
					  (this.titleControls = this.add.sprite(
							0.22 * this.world.width,
							this.world.height - 15,
							'title_controls'
					  )),
					  this.titleControls.anchor.setTo(0.5),
					  this.titleControls.scale.setTo(0.8))
					: (this.menuOptionLabel2.text =
							'Please use a device\nwith a physical keyboard\nto play this game!'),
				this.enter.onDown.add(function () {
					this.menuDecision(this.menuState, this.menuPosition);
				}, this),
				this.z.onDown.add(function () {
					this.menuDecision(this.menuState, this.menuPosition);
				}, this),
				this.cursors.up.onDown.add(function () {
					0 != this.menuState && this.moveArrow('up');
				}, this),
				this.cursors.down.onDown.add(function () {
					0 != this.menuState && this.moveArrow('down');
				}, this),
				this.game.device.desktop &&
					((this.cheat = this.game.add.button(
						this.world.width - 48,
						20,
						'cheat',
						this.cheatLevels,
						this
					)),
					(this.cheat.input.useHandCursor = !0)),
				this.game.device.desktop &&
					((this.statsTitleLabel = this.game.add.text(
						this.game.world.width - 200 + 28,
						this.game.world.height - 140,
						'Game Stats',
						{ font: '25px VT323', fill: '#fff' }
					)),
					this.statsTitleLabel.anchor.setTo(0.5),
					(this.statsTitleLabel.stroke = '#000000'),
					(this.statsTitleLabel.strokeThickness = 2),
					(this.statsDonutIcon = this.add.sprite(
						this.game.camera.width - 265 + 28,
						this.game.world.height - 105,
						'donut1'
					)),
					(this.statsDonutIcon.fixedToCamera = !0),
					this.statsDonutIcon.anchor.setTo(1, 0.5),
					this.statsDonutIcon.scale.setTo(0.3, 0.3),
					(this.statsDonutLabel = this.game.add.text(
						this.statsDonutIcon.x,
						this.statsDonutIcon.y,
						': ' + this.totalGotDonuts + '/' + this.totalGameDonuts,
						{ font: '25px VT323', fill: '#fff' }
					)),
					this.statsDonutLabel.anchor.setTo(0, 0.5),
					(this.statsDonutLabel.stroke = '#000000'),
					(this.statsDonutLabel.strokeThickness = 2),
					this.totalGotDonuts >= this.totalGameDonuts &&
						this.statsDonutLabel.addColor('#ffd700', 2),
					(this.statsCharIcon = this.add.sprite(
						this.game.camera.width - 265 + 28,
						this.game.world.height - 70,
						'statsChar'
					)),
					(this.statsCharIcon.fixedToCamera = !0),
					this.statsCharIcon.anchor.setTo(1, 0.5),
					this.statsCharIcon.scale.setTo(0.3, 0.3),
					(this.statsCharLabel = this.game.add.text(
						this.statsCharIcon.x,
						this.statsCharIcon.y,
						': ' + this.totalGotChars + '/' + this.totalGameChars,
						{ font: '25px VT323', fill: '#fff' }
					)),
					this.statsCharLabel.anchor.setTo(0, 0.5),
					(this.statsCharLabel.stroke = '#000000'),
					(this.statsCharLabel.strokeThickness = 2),
					this.totalGotChars >= this.totalGameChars && this.statsCharLabel.addColor('#ffd700', 2),
					(this.statsWeaponIcon = this.add.sprite(
						this.game.camera.width - 265 + 28,
						this.game.world.height - 40,
						'powerupItem'
					)),
					(this.statsWeaponIcon.fixedToCamera = !0),
					this.statsWeaponIcon.anchor.setTo(1, 0.5),
					this.statsWeaponIcon.scale.setTo(0.35, 0.35),
					(this.statsWeaponLabel = this.game.add.text(
						this.statsWeaponIcon.x,
						this.statsWeaponIcon.y,
						': ' + this.totalGotWeapons + '/' + this.totalGameWeapons,
						{ font: '25px VT323', fill: '#fff' }
					)),
					this.statsWeaponLabel.anchor.setTo(0, 0.5),
					(this.statsWeaponLabel.stroke = '#000000'),
					(this.statsWeaponLabel.strokeThickness = 2),
					this.totalGotWeapons >= this.totalGameWeapons &&
						this.statsWeaponLabel.addColor('#ffd700', 2),
					(this.statsDeathIcon = this.add.sprite(
						this.game.camera.width - 85,
						this.game.world.height - 43,
						'skull'
					)),
					(this.statsDeathIcon.fixedToCamera = !0),
					this.statsDeathIcon.anchor.setTo(1, 0.5),
					this.statsDeathIcon.scale.setTo(0.5, 0.5),
					(this.statsDeathLabel = this.game.add.text(
						this.statsDeathIcon.x,
						this.statsDeathIcon.y,
						' ' + this.deathTracker.total,
						{ font: '25px VT323', fill: '#fff' }
					)),
					this.statsDeathLabel.anchor.setTo(0, 0.5),
					(this.statsDeathLabel.stroke = '#000000'),
					(this.statsDeathLabel.strokeThickness = 2)),
				this.totalGotDonuts >= this.totalGameDonuts &&
					this.totalGotChars >= this.totalGameChars &&
					this.totalGotWeapons >= this.totalGameWeapons &&
					(this.nameLabel.text = 'Donut\nMan'),
				(this.gameCompleteGift = !1),
				this.levelTracker.completed)
			) {
				this.gameCompleteGift = !0;
				for (var n = 0; n < this.characterArray.length; n++)
					'safety cap' == this.characterArray[n] &&
						((this.gameCompleteGift = !1), (n = this.characterArray.length + 1));
			}
			this.gameCompleteGift
				? this.giftOverlay()
				: (this.game.add
						.tween(this.nameLabel)
						.to({ x: 20 }, 1e3, 'Exponential', !0, 700)
						.easing(Phaser.Easing.Exponential.Out)
						.start(),
				  this.donutboyIntroMusic.play());
		},
		menuDecision: function (t, e) {
			0 == t
				? ((this.menuState = 1),
				  (this.menuPosition = 0),
				  this.updateMenu(this.menuState, this.menuPosition))
				: 1 == t
				? (0 == e &&
						(this.levelTracker.level1 && !this.levelTracker.completed
							? ((this.menuState = 4),
							  (this.menuPosition = 2),
							  this.updateMenu(this.menuState, this.menuPosition))
							: this.start()),
				  1 == e && this.continueGame(),
				  2 == e &&
						((this.menuState = 2),
						this.levelTracker.level1 ? (this.menuPosition = 0) : (this.menuPosition = 5),
						this.updateStatsMenu(this.menuState, this.menuPosition),
						this.updateMenu(this.menuState, this.menuPosition)),
				  3 == e && this.start('level22data'),
				  4 == e &&
						((this.menuState = 3),
						(this.menuPosition = 2),
						this.updateMenu(this.menuState, this.menuPosition)))
				: 2 == t
				? (0 == e && this.start('level21data'),
				  1 == e && this.start('level20data'),
				  2 == e && this.start('level23data'),
				  3 == e && this.start('level25data'),
				  4 == e && this.start('level18data'),
				  5 == e &&
						((this.menuState = 1),
						(this.menuPosition = 0),
						this.updateMenu(this.menuState, this.menuPosition)))
				: 3 == t
				? (2 == e &&
						(localStorage.clear(),
						this.badSpeakSFX.play(),
						this.loadStatsAndData(),
						this.updateStatsMenu(),
						(this.nameLabel.text = 'Donut\nBoy'),
						(this.menuState = 1),
						(this.menuPosition = 0),
						this.updateMenu(this.menuState, this.menuPosition, !0)),
				  3 == e &&
						((this.menuState = 1),
						(this.menuPosition = 0),
						this.updateMenu(this.menuState, this.menuPosition)))
				: 4 == t &&
				  (2 == e && (localStorage.clear(), this.start()),
				  3 == e &&
						((this.menuState = 1),
						(this.menuPosition = 0),
						this.updateMenu(this.menuState, this.menuPosition)));
		},
		continueGame: function () {
			for (var t = 1, e = 1; e < 6; e++) {
				var s = 'level' + e;
				this.levelTracker[s] && (t = e + 1);
			}
			1 == t && this.start('level21data'),
				2 == t && this.start('level20data'),
				3 == t && this.start('level23data'),
				4 == t && this.start('level25data'),
				(5 != t && 6 != t) || this.start('level18data');
		},
		updateStatsMenu: function (t, e) {
			2 == t && 0 == e
				? ((this.statsTitleLabel.text = 'Level 1 Stats'),
				  (this.statsDonutLabel.text =
						': ' + this.donutTracker.level1got + '/' + this.donutTracker.level1max),
				  (this.statsCharLabel.text =
						': ' + this.charTracker.level1got.length + '/' + this.charTracker.level1max),
				  (this.statsWeaponLabel.text =
						': ' + this.weaponTracker.level1got.length + '/' + this.weaponTracker.level1max),
				  (this.statsDeathLabel.text = ' ' + this.deathTracker.level1),
				  this.donutTracker.level1got >= this.donutTracker.level1max
						? this.statsDonutLabel.addColor('#ffd700', 2)
						: this.statsDonutLabel.addColor('#fff', 2),
				  this.charTracker.level1got.length >= this.charTracker.level1max
						? this.statsCharLabel.addColor('#ffd700', 2)
						: this.statsCharLabel.addColor('#fff', 2),
				  this.weaponTracker.level1got.length >= this.weaponTracker.level1max
						? this.statsWeaponLabel.addColor('#ffd700', 2)
						: this.statsWeaponLabel.addColor('#fff', 2))
				: 2 == t && 1 == e
				? ((this.statsTitleLabel.text = 'Level 2 Stats'),
				  (this.statsDonutLabel.text =
						': ' + this.donutTracker.level2got + '/' + this.donutTracker.level2max),
				  (this.statsCharLabel.text =
						': ' + this.charTracker.level2got.length + '/' + this.charTracker.level2max),
				  (this.statsWeaponLabel.text =
						': ' + this.weaponTracker.level2got.length + '/' + this.weaponTracker.level2max),
				  (this.statsDeathLabel.text = ' ' + this.deathTracker.level2),
				  this.donutTracker.level2got >= this.donutTracker.level2max
						? this.statsDonutLabel.addColor('#ffd700', 2)
						: this.statsDonutLabel.addColor('#fff', 2),
				  this.charTracker.level2got.length >= this.charTracker.level2max
						? this.statsCharLabel.addColor('#ffd700', 2)
						: this.statsCharLabel.addColor('#fff', 2),
				  this.weaponTracker.level2got.length >= this.weaponTracker.level2max
						? this.statsWeaponLabel.addColor('#ffd700', 2)
						: this.statsWeaponLabel.addColor('#fff', 2))
				: 2 == t && 2 == e
				? ((this.statsTitleLabel.text = 'Level 3 Stats'),
				  (this.statsDonutLabel.text =
						': ' + this.donutTracker.level3got + '/' + this.donutTracker.level3max),
				  (this.statsCharLabel.text =
						': ' + this.charTracker.level3got.length + '/' + this.charTracker.level3max),
				  (this.statsWeaponLabel.text =
						': ' + this.weaponTracker.level3got.length + '/' + this.weaponTracker.level3max),
				  (this.statsDeathLabel.text = ' ' + this.deathTracker.level3),
				  this.donutTracker.level3got >= this.donutTracker.level3max
						? this.statsDonutLabel.addColor('#ffd700', 2)
						: this.statsDonutLabel.addColor('#fff', 2),
				  this.charTracker.level3got.length >= this.charTracker.level3max
						? this.statsCharLabel.addColor('#ffd700', 2)
						: this.statsCharLabel.addColor('#fff', 2),
				  this.weaponTracker.level3got.length >= this.weaponTracker.level3max
						? this.statsWeaponLabel.addColor('#ffd700', 2)
						: this.statsWeaponLabel.addColor('#fff', 2))
				: 2 == t && 3 == e
				? ((this.statsTitleLabel.text = 'Level 4 Stats'),
				  (this.statsDonutLabel.text =
						': ' + this.donutTracker.level4got + '/' + this.donutTracker.level4max),
				  (this.statsCharLabel.text =
						': ' + this.charTracker.level4got.length + '/' + this.charTracker.level4max),
				  (this.statsWeaponLabel.text =
						': ' + this.weaponTracker.level4got.length + '/' + this.weaponTracker.level4max),
				  (this.statsDeathLabel.text = ' ' + this.deathTracker.level4),
				  this.donutTracker.level4got >= this.donutTracker.level4max
						? this.statsDonutLabel.addColor('#ffd700', 2)
						: this.statsDonutLabel.addColor('#fff', 2),
				  this.charTracker.level4got.length >= this.charTracker.level4max
						? this.statsCharLabel.addColor('#ffd700', 2)
						: this.statsCharLabel.addColor('#fff', 2),
				  this.weaponTracker.level4got.length >= this.weaponTracker.level4max
						? this.statsWeaponLabel.addColor('#ffd700', 2)
						: this.statsWeaponLabel.addColor('#fff', 2))
				: 2 == t && 4 == e
				? ((this.statsTitleLabel.text = 'Level 5 Stats'),
				  (this.statsDonutLabel.text =
						': ' + this.donutTracker.level5got + '/' + this.donutTracker.level5max),
				  (this.statsCharLabel.text =
						': ' + this.charTracker.level5got.length + '/' + this.charTracker.level5max),
				  (this.statsWeaponLabel.text =
						': ' + this.weaponTracker.level5got.length + '/' + this.weaponTracker.level5max),
				  (this.statsDeathLabel.text = ' ' + this.deathTracker.level5),
				  this.donutTracker.level5got >= this.donutTracker.level5max
						? this.statsDonutLabel.addColor('#ffd700', 2)
						: this.statsDonutLabel.addColor('#fff', 2),
				  this.charTracker.level5got.length >= this.charTracker.level5max
						? this.statsCharLabel.addColor('#ffd700', 2)
						: this.statsCharLabel.addColor('#fff', 2),
				  this.weaponTracker.level5got.length >= this.weaponTracker.level5max
						? this.statsWeaponLabel.addColor('#ffd700', 2)
						: this.statsWeaponLabel.addColor('#fff', 2))
				: ((this.statsTitleLabel.text = 'Game Stats'),
				  (this.statsDonutLabel.text = ': ' + this.totalGotDonuts + '/' + this.totalGameDonuts),
				  (this.statsCharLabel.text = ': ' + this.totalGotChars + '/' + this.totalGameChars),
				  (this.statsWeaponLabel.text = ': ' + this.totalGotWeapons + '/' + this.totalGameWeapons),
				  (this.statsDeathLabel.text = ' ' + this.deathTracker.total),
				  this.totalGotDonuts >= this.totalGameDonuts
						? this.statsDonutLabel.addColor('#ffd700', 2)
						: this.statsDonutLabel.addColor('#fff', 2),
				  this.totalGotChars >= this.totalGameChars
						? this.statsCharLabel.addColor('#ffd700', 2)
						: this.statsCharLabel.addColor('#fff', 2),
				  this.totalGotWeapons >= this.totalGameWeapons
						? this.statsWeaponLabel.addColor('#ffd700', 2)
						: this.statsWeaponLabel.addColor('#fff', 2));
		},
		loadStatsAndData: function () {
			null === localStorage.getItem('DBdeathTracker')
				? (this.deathTracker = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0, total: 0 })
				: (this.deathTracker = JSON.parse(localStorage.getItem('DBdeathTracker'))),
				null === localStorage.getItem('DBlevelTracker')
					? (this.levelTracker = {
							opening: !1,
							level1: !1,
							level2: !1,
							level3: !1,
							level4: !1,
							level5: !1,
							completed: !1
					  })
					: (this.levelTracker = JSON.parse(localStorage.getItem('DBlevelTracker'))),
				null === localStorage.getItem('DBdonutTracker')
					? (this.donutTracker = {
							level1got: 0,
							level1max: 58,
							level2got: 0,
							level2max: 57,
							level3got: 0,
							level3max: 79,
							level4got: 0,
							level4max: 120,
							level5got: 0,
							level5max: 99
					  })
					: (this.donutTracker = JSON.parse(localStorage.getItem('DBdonutTracker'))),
				(this.totalGotDonuts =
					this.donutTracker.level1got +
					this.donutTracker.level2got +
					this.donutTracker.level3got +
					this.donutTracker.level4got +
					this.donutTracker.level5got),
				(this.totalGameDonuts =
					this.donutTracker.level1max +
					this.donutTracker.level2max +
					this.donutTracker.level3max +
					this.donutTracker.level4max +
					this.donutTracker.level5max),
				null === localStorage.getItem('DBcharTracker')
					? (this.charTracker = {
							level1got: [],
							level1max: 3,
							level2got: [],
							level2max: 3,
							level3got: [],
							level3max: 3,
							level4got: [],
							level4max: 5,
							level5got: [],
							level5max: 3
					  })
					: (this.charTracker = JSON.parse(localStorage.getItem('DBcharTracker'))),
				(this.totalGotChars =
					this.charTracker.level1got.length +
					this.charTracker.level2got.length +
					this.charTracker.level3got.length +
					this.charTracker.level4got.length +
					this.charTracker.level5got.length +
					1),
				(this.totalGameChars =
					this.charTracker.level1max +
					this.charTracker.level2max +
					this.charTracker.level3max +
					this.charTracker.level4max +
					this.charTracker.level5max +
					1),
				null === localStorage.getItem('DBchars')
					? (this.characterArray = ['donut boy'])
					: (this.characterArray = JSON.parse(localStorage.getItem('DBchars'))),
				null === localStorage.getItem('DBweaponTracker')
					? (this.weaponTracker = {
							level1got: [],
							level1max: 1,
							level2got: [],
							level2max: 1,
							level3got: [],
							level3max: 2,
							level4got: [],
							level4max: 1,
							level5got: [],
							level5max: 1
					  })
					: (this.weaponTracker = JSON.parse(localStorage.getItem('DBweaponTracker'))),
				(this.totalGotWeapons =
					this.weaponTracker.level1got.length +
					this.weaponTracker.level2got.length +
					this.weaponTracker.level3got.length +
					this.weaponTracker.level4got.length +
					this.weaponTracker.level5got.length +
					1),
				(this.totalGameWeapons =
					this.weaponTracker.level1max +
					this.weaponTracker.level2max +
					this.weaponTracker.level3max +
					this.weaponTracker.level4max +
					this.weaponTracker.level5max +
					1);
		},
		updateMenu: function (t, e, s) {
			if ((s || this.menuChangeSFX.play(), 1 == t)) {
				(this.menuArrow.y = this.menuOptionLabel0.y - 8),
					(this.menuArrow.alpha = 1),
					(this.maxMenuPositions = 4),
					this.levelTracker.completed
						? (this.menuOptionLabel0.text = 'New Game+')
						: (this.menuOptionLabel0.text = 'New Game'),
					(this.menuOptionLabel0.alpha = 1);
				for (var i = 1, a = 1; a < 6; a++) {
					var h = 'level' + a;
					this.levelTracker[h] && (i = a + 1);
				}
				1 == i && (this.menuOptionLabel1.text = 'Continue (lvl 1)'),
					2 == i && (this.menuOptionLabel1.text = 'Continue (lvl 2)'),
					3 == i && (this.menuOptionLabel1.text = 'Continue (lvl 3)'),
					4 == i && (this.menuOptionLabel1.text = 'Continue (lvl 4)'),
					(5 != i && 6 != i) || (this.menuOptionLabel1.text = 'Continue (lvl 5)'),
					this.levelTracker.level1
						? (this.menuOptionLabel1.alpha = 1)
						: ((this.menuOptionLabel1.text = 'Continue'), (this.menuOptionLabel1.alpha = 0.5)),
					(this.menuOptionLabel2.text = 'Level Select'),
					(this.menuOptionLabel2.alpha = 1),
					(this.menuOptionLabel3.text = 'Credits'),
					(this.menuOptionLabel3.alpha = 1),
					(this.menuOptionLabel4.text = 'Clear Data'),
					this.levelTracker.level1
						? (this.menuOptionLabel4.alpha = 1)
						: (this.menuOptionLabel4.alpha = 0.5),
					(this.menuOptionLabel5.text = '');
			} else
				2 == t
					? (this.levelTracker.level1
							? (this.menuArrow.y = this.menuOptionLabel0.y - 8)
							: (this.menuArrow.y = this.menuOptionLabel5.y - 8),
					  (this.maxMenuPositions = 5),
					  this.levelTracker.opening
							? ((this.menuOptionLabel0.text = 'Level 1: Bonk Beach'),
							  (this.menuOptionLabel0.alpha = 1))
							: ((this.menuOptionLabel0.text = 'Level 1: ??? ???'),
							  (this.menuOptionLabel0.alpha = 0.5)),
					  this.levelTracker.level1
							? ((this.menuOptionLabel1.text = "Level 2: Grandma's Basement"),
							  (this.menuOptionLabel1.alpha = 1))
							: ((this.menuOptionLabel1.text = 'Level 2: ??? ???'),
							  (this.menuOptionLabel1.alpha = 0.5)),
					  this.levelTracker.level2
							? ((this.menuOptionLabel2.text = 'Level 3: Fishstick Facility'),
							  (this.menuOptionLabel2.alpha = 1))
							: ((this.menuOptionLabel2.text = 'Level 3: ??? ???'),
							  (this.menuOptionLabel2.alpha = 0.5)),
					  this.levelTracker.level3
							? ((this.menuOptionLabel3.text = 'Level 4: Freshkills Graveyard'),
							  (this.menuOptionLabel3.alpha = 1))
							: ((this.menuOptionLabel3.text = 'Level 4: ??? ???'),
							  (this.menuOptionLabel3.alpha = 0.5)),
					  this.levelTracker.level4
							? ((this.menuOptionLabel4.text = 'Level 5: Just A Lil Ol Bakery'),
							  (this.menuOptionLabel4.alpha = 1))
							: ((this.menuOptionLabel4.text = 'Level 5: ??? ???'),
							  (this.menuOptionLabel4.alpha = 0.5)),
					  (this.menuOptionLabel5.text = 'Back'))
					: 3 == t
					? ((this.menuArrow.y = this.menuOptionLabel3.y - 8),
					  (this.menuPosition = 3),
					  (this.menuOptionLabel0.text = 'Delete all saved data?'),
					  (this.menuOptionLabel0.alpha = 1),
					  (this.menuOptionLabel1.text = ''),
					  (this.menuOptionLabel2.text = 'yea'),
					  (this.menuOptionLabel2.alpha = 1),
					  (this.menuOptionLabel3.text = 'na'),
					  (this.menuOptionLabel3.alpha = 1),
					  (this.menuOptionLabel4.text = ''),
					  (this.menuOptionLabel5.text = ''))
					: 4 == t &&
					  ((this.menuArrow.y = this.menuOptionLabel3.y - 8),
					  (this.menuPosition = 3),
					  (this.menuOptionLabel0.text = 'Delete data and start over?'),
					  (this.menuOptionLabel0.alpha = 1),
					  (this.menuOptionLabel1.text = ''),
					  (this.menuOptionLabel2.text = 'yea'),
					  (this.menuOptionLabel2.alpha = 1),
					  (this.menuOptionLabel3.text = 'na'),
					  (this.menuOptionLabel3.alpha = 1),
					  (this.menuOptionLabel4.text = ''),
					  (this.menuOptionLabel5.text = ''));
		},
		moveArrow: function (t) {
			if ((this.menuChangeSFX.play(), 3 != this.menuState && 4 != this.menuState)) {
				'up' == t ? this.menuPosition-- : this.menuPosition++;
				for (var e = 'menuOptionLabel' + this.menuPosition; this[e] && this[e].alpha < 1; )
					'up' == t ? this.menuPosition-- : this.menuPosition++,
						(e = 'menuOptionLabel' + this.menuPosition);
				if (this.menuPosition > this.maxMenuPositions) {
					this.menuPosition = 0;
					for (e = 'menuOptionLabel' + this.menuPosition; this[e] && this[e].alpha < 1; )
						'up' == t ? this.menuPosition-- : this.menuPosition++,
							(e = 'menuOptionLabel' + this.menuPosition);
				}
				if (this.menuPosition < 0) {
					this.menuPosition = this.maxMenuPositions;
					for (e = 'menuOptionLabel' + this.menuPosition; this[e] && this[e].alpha < 1; )
						'up' == t ? this.menuPosition-- : this.menuPosition++,
							(e = 'menuOptionLabel' + this.menuPosition);
				}
				2 == this.menuState && this.updateStatsMenu(this.menuState, this.menuPosition);
			} else 3 == this.menuPosition ? (this.menuPosition = 2) : (this.menuPosition = 3);
			var s = 'menuOptionLabel' + this.menuPosition;
			this.menuArrow.y = this[s].y - 8;
		},
		toggleSound: function () {
			(this.game.sound.mute = !this.game.sound.mute),
				(this.muteButton.frame = this.game.sound.mute ? 1 : 0),
				(this.levelTracker = {
					opening: !0,
					level1: !0,
					level2: !0,
					level3: !0,
					level4: !0,
					level5: !0,
					completed: !0
				}),
				localStorage.setItem('DBlevelTracker', JSON.stringify(this.levelTracker));
		},
		cheatLevels: function () {
			this.levelTracker.level5 ||
				((this.levelTracker = {
					opening: !0,
					level1: !0,
					level2: !0,
					level3: !0,
					level4: !0,
					level5: !0,
					completed: this.levelTracker.completed
				}),
				localStorage.setItem('DBlevelTracker', JSON.stringify(this.levelTracker)),
				this.secretBellSFX.play(),
				2 == this.menuState &&
					((this.menuPosition = 0),
					this.updateMenu(2, this.menuPosition, !0),
					this.updateStatsMenu(this.menuState, this.menuPosition)));
		},
		giftOverlay: function () {
			(this.overlay = this.add.bitmapData(this.world.width, this.world.height)),
				(this.overlay.ctx.fillStyle = '#000'),
				this.overlay.ctx.fillRect(0, 0, this.world.width, this.world.height),
				(this.panel = this.add.sprite(0, 0, this.overlay)),
				this.panel.anchor.setTo(0, 0),
				(this.yayEmitter = this.game.add.emitter(0, this.world.height, 70)),
				this.yayEmitter.makeParticles([
					'yay1',
					'yay2',
					'yay3',
					'yay4',
					'yay5',
					'yay6',
					'yay7',
					'yay8',
					'yay9',
					'yay10'
				]),
				this.game.physics.arcade.enable(this.yayEmitter),
				this.yayEmitter.setYSpeed(-450, -120),
				this.yayEmitter.setXSpeed(5, 150),
				(this.yayEmitter.minParticleScale = 3),
				(this.yayEmitter.maxParticleScale = 4.2),
				(this.yayEmitter.minParticleAlpha = 0.8),
				(this.yayEmitter.maxParticleAlpha = 1),
				(this.yayEmitter.gravity = 170),
				(this.yayEmitter2 = this.game.add.emitter(this.world.width, this.world.height, 70)),
				this.yayEmitter2.makeParticles([
					'yay1',
					'yay2',
					'yay3',
					'yay4',
					'yay5',
					'yay6',
					'yay7',
					'yay8',
					'yay9',
					'yay10'
				]),
				this.game.physics.arcade.enable(this.yayEmitter2),
				this.yayEmitter2.setYSpeed(-450, -120),
				this.yayEmitter2.setXSpeed(-150, -5),
				(this.yayEmitter2.minParticleScale = 3),
				(this.yayEmitter2.maxParticleScale = 4.2),
				(this.yayEmitter2.minParticleAlpha = 0.8),
				(this.yayEmitter2.maxParticleAlpha = 1),
				(this.yayEmitter2.gravity = 170),
				this.yayEmitter.start(!0, 9e3, null, 70),
				this.yayEmitter2.start(!0, 9e3, null, 70),
				(this.fakeGoal = this.add.sprite(
					this.world.width / 2,
					this.world.height / 2 - 50,
					'safety cap'
				)),
				this.fakeGoal.anchor.setTo(0.5),
				this.fakeGoal.scale.setTo(-0.5, 0.5),
				(this.missionLabel1 = this.game.add.text(
					this.world.width / 2,
					this.world.height / 2,
					'You unlocked Safety Cap',
					{ font: '20px Geo', fill: '#fff' }
				)),
				this.missionLabel1.anchor.setTo(0.5),
				(this.missionLabel2 = this.game.add.text(
					this.world.width / 2,
					this.world.height / 2 + 20,
					'as a playable character!',
					{ font: '20px Geo', fill: '#fff' }
				)),
				this.missionLabel2.anchor.setTo(0.5),
				(this.missionLabel4 = this.game.add.text(
					this.world.width / 2,
					this.world.height / 2 + 120,
					'Press Enter to continue',
					{ font: '16px Geo', fill: '#fff' }
				)),
				this.missionLabel4.anchor.setTo(0.5),
				(this.yaySFX = this.game.add.audio('yay')),
				(this.yaySFX.volume = 0.2),
				this.yaySFX.play();
			for (var t = !1, e = 0; e < this.characterArray.length; e++)
				'safety cap' == this.characterArray[e] && ((t = !0), (e = this.characterArray.length + 1));
			t ||
				(this.characterArray.push('safety cap'),
				localStorage.setItem('DBchars', JSON.stringify(this.characterArray)),
				localStorage.setItem('DBcharIndex', this.characterArray.length - 1)),
				this.enter.onDown.addOnce(function () {
					this.destroyGiftOverlay();
				}, this);
		},
		destroyGiftOverlay: function () {
			this.panel.destroy(),
				this.yayEmitter.destroy(),
				this.yayEmitter2.destroy(),
				this.missionLabel1.destroy(),
				this.missionLabel2.destroy(),
				this.missionLabel4.destroy(),
				this.fakeGoal.destroy(),
				this.game.add
					.tween(this.nameLabel)
					.to({ x: 20 }, 1e3, 'Exponential', !0)
					.easing(Phaser.Easing.Exponential.Out)
					.start(),
				this.donutboyIntroMusic.play();
		},
		start: function (t) {
			this.donutboyIntroMusic.isPlaying && this.donutboyIntroMusic.stop(),
				this.donutboyMusic.isPlaying && this.donutboyMusic.stop(),
				t ? this.game.state.start('Game', !0, !1, t) : this.game.state.start('Game');
		}
	}),
	((FaceGame = FaceGame || {}).Pill = function (t, e, s, i, a) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.x = Math.round(e)),
			(this.y = Math.round(s));
		var h = this.y;
		this.game.physics.arcade.enableBody(this),
			(this.body.checkCollision.up = !1),
			(this.body.allowGravity = !1),
			this.scale.setTo(0.4),
			(this.itemTween = this.game.add.tween(this)),
			this.itemTween
				.to({ y: h - 5 }, 700)
				.to({ y: h }, 700)
				.loop()
				.start();
	}),
	(FaceGame.Pill.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Pill.prototype.constructor = FaceGame.Pill),
	(FaceGame.Pill.prototype.update = function () {}),
	((FaceGame = FaceGame || {}).Platform = function (t, e, s, i, a, h, o, r, l, n, m) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = l),
			this.anchor.setTo(0.5),
			this.scale.setTo(1),
			r || (r = Math.random() < 0.5 ? 1 : -1),
			a || (a = 100 * r),
			h || (h = 100),
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			this.body.bounce.set(1, 0),
			'up' == o ? (this.body.velocity.y = a) : (this.body.velocity.x = a),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			(this.body.checkCollision.down = !1),
			(this.body.checkCollision.left = !1),
			(this.body.checkCollision.right = !1),
			m || (m = 1),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x,
				distance: h,
				direction: o,
				slowdownPoint: 0.5 * h,
				switchTie: n,
				on: m
			}),
			1 != this.customParams.on && (this.body.moves = !1),
			(this.fullVelocity = a),
			(this.frictionMomentum = 6),
			'up' == o &&
				((this.slowdownTopBoundary = this.customParams.originalY - 0.5 * h),
				(this.slowdownBottomBoundary = this.customParams.originalY + 0.5 * h)),
			'false' == this.customParams.on &&
				('up' == this.customParams.direction
					? (this.y = this.y + this.customParams.distance + 5)
					: (this.x = this.x - this.customParams.distance + 5)),
			(this.autoCull = !0);
	}),
	(FaceGame.Platform.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Platform.prototype.constructor = FaceGame.Platform),
	(FaceGame.Platform.prototype.update = function () {
		1 == this.customParams.on &&
			('up' == this.customParams.direction
				? this.body.velocity.y > 0 &&
				  this.y - this.customParams.distance > this.customParams.originalY
					? (this.body.velocity.y *= -1)
					: this.body.velocity.y < 0 &&
					  this.y + this.customParams.distance < this.customParams.originalY &&
					  (this.body.velocity.y *= -1)
				: this.body.velocity.x > 0 &&
				  this.x - this.customParams.distance > this.customParams.originalX
				? (this.body.velocity.x *= -1)
				: this.body.velocity.x < 0 &&
				  this.x + this.customParams.distance < this.customParams.originalX &&
				  (this.body.velocity.x *= -1));
	}),
	((FaceGame = FaceGame || {}).PlatformFalling = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.player = o),
			(this.game = t),
			(this.tilemap = h),
			this.anchor.setTo(0.5),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			(this.body.immovable = !0),
			(this.body.checkCollision.down = !1),
			(this.body.checkCollision.left = !1),
			(this.body.checkCollision.right = !1),
			(this.outOfBoundsKill = !0),
			(this.health = 3),
			(this.platBreakSFX = this.game.add.audio('platBreakSFX')),
			(this.platBreakSFX.volume = 0.6),
			(this.customParams = {
				fall: a,
				originalX: this.x,
				originalY: this.y,
				helpIveFallenAndICantGetUp: !1
			}),
			(this.autoCull = !0);
	}),
	(FaceGame.PlatformFalling.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.PlatformFalling.prototype.constructor = FaceGame.PlatformFalling),
	(FaceGame.PlatformFalling.prototype.update = function () {
		if (this.bottom + 4 >= this.game.world.height) {
			if (!this.alive) return;
			this.kill();
		}
	}),
	(FaceGame.PlatformFalling.prototype.resetThePlat = function () {
		(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			(this.customParams.helpIveFallenAndICantGetUp = !1),
			this.reset(this.customParams.originalX, this.customParams.originalY);
	}),
	(FaceGame.PlatformFalling.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0
				? (this.platBreakSFX.play(),
				  (this.platEmitter = this.game.add.emitter(this.x, this.y, 5)),
				  this.platEmitter.makeParticles(['platEmit1', 'platEmit2']),
				  this.game.physics.arcade.enable(this.platEmitter),
				  (this.platEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				  'jump' == e
						? (this.platEmitter.setYSpeed(-250, 250), this.platEmitter.setXSpeed(-250, 250))
						: 'shoot' == e &&
						  ('right' == s
								? (this.platEmitter.setXSpeed(100, 200), this.platEmitter.setYSpeed(-100, 200))
								: 'left' == s &&
								  (this.platEmitter.setXSpeed(-100, -200), this.platEmitter.setYSpeed(-100, 100))),
				  this.platEmitter.start(!0, 1e3, null, 8),
				  this.kill())
				: this.platBreakSFX.play();
	}),
	((FaceGame = FaceGame || {}).PlayerBullet = function (t, e, s) {
		Phaser.Sprite.call(this, t, e, s, 'bullet'),
			(this.game = t),
			this.anchor.setTo(0.5),
			(this.checkWorldBounds = !0),
			(this.outOfBoundsKill = !0),
			(this.customParams = { timesCollided: 0, activatedSwitch: !1 });
	}),
	(FaceGame.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.PlayerBullet.prototype.constructor = FaceGame.PlayerBullet),
	(FaceGame.PlayerBullet.prototype.update = function () {
		(this.x < this.game.camera.x - 100 ||
			this.x > this.game.camera.x + this.game.camera.width + 100) &&
			0 == this.customParams.timesCollided &&
			this.kill();
	}),
	((FaceGame = FaceGame || {}).PreloadState = {
		preload: function () {
			(this.loadLabel = this.game.add.text(
				this.game.world.centerX,
				this.game.world.centerY - 20,
				'Loading...',
				{ font: '30px Geo', fill: '#fff' }
			)),
				(this.loadLabel.stroke = '#000000'),
				(this.loadLabel.strokeThickness = 2),
				this.loadLabel.anchor.setTo(0.5),
				FaceGame.PreloadState.game.time.events.add(5e3, function () {
					(this.loadLabel2 = FaceGame.PreloadState.game.add.text(
						FaceGame.PreloadState.game.world.centerX,
						FaceGame.PreloadState.game.world.centerY + 60,
						'almost there...',
						{ font: '20px Geo', fill: '#fff' }
					)),
						(this.loadLabel2.stroke = '#000000'),
						(this.loadLabel2.strokeThickness = 2),
						this.loadLabel2.anchor.setTo(0.5);
				}),
				(this.preloadBar = this.add.sprite(
					this.game.world.centerX - 105,
					this.game.world.centerY,
					'preloadbar'
				)),
				this.load.setPreloadSprite(this.preloadBar),
				this.load.image('donut boy', 'assets-db/images/damon_fingerRemoved.png'),
				this.load.image('kelly', 'assets-db/images/kelly.png'),
				this.load.image('sam', 'assets-db/images/sam.png'),
				this.load.image('zach', 'assets-db/images/zach.png'),
				this.load.image('mezcal', 'assets-db/images/mezcal.png'),
				this.load.image('abdullah', 'assets-db/images/abdullah2.png'),
				this.load.image('jon', 'assets-db/images/jon2.png'),
				this.load.image('tom', 'assets-db/images/tom.png'),
				this.load.image('Альберт', 'assets-db/images/chops.png'),
				this.load.image('karl', 'assets-db/images/karl.png'),
				this.load.image('mr sticks', 'assets-db/images/creep.png'),
				this.load.image('grams', 'assets-db/images/grams.png'),
				this.load.image('greg', 'assets-db/images/jesus2.png'),
				this.load.image('piggy', 'assets-db/images/piggy.png'),
				this.load.image('pargo', 'assets-db/images/pargo.png'),
				this.load.image('astro gal', 'assets-db/images/spaceboy2.png'),
				this.load.image('pup', 'assets-db/images/pup.png'),
				this.load.image('bill', 'assets-db/images/bill2.png'),
				this.load.image('aldo', 'assets-db/images/pixelboi.png'),
				this.load.spritesheet('static', 'assets-db/images/static_spritesheet.png', 100, 100),
				this.game.device.desktop &&
					(this.load.image('bullet', 'assets-db/images/bullet.png'),
					this.load.image('bubble', 'assets-db/images/bubble.png'),
					this.load.image('foxLaser', 'assets-db/images/foxLaser.png'),
					this.load.image('frisbee', 'assets-db/images/frisbee.png'),
					this.load.image('kifli', 'assets-db/images/kifli.png'),
					this.load.image('bullet_icon_pistol', 'assets-db/images/bullet_icon_pistol.png'),
					this.load.image('bullet_icon_clobb', 'assets-db/images/bullet_icon_clobb.png'),
					this.load.image('bullet_icon_croissant', 'assets-db/images/bullet_icon_croissant.png'),
					this.load.image('bullet_icon_shotgun', 'assets-db/images/bullet_icon_shotgun.png'),
					this.load.image('bullet_icon_laser', 'assets-db/images/bullet_icon_laser.png'),
					this.load.image('bullet_icon_bubblegun', 'assets-db/images/bullet_icon_bubblegun.png'),
					this.load.image('bullet_icon_frisbee', 'assets-db/images/bullet_icon_frisbee.png'),
					this.load.image('healthHUD1', 'assets-db/images/healthHUD1.png'),
					this.load.image('healthHUD2', 'assets-db/images/healthHUD2.png'),
					this.load.image('rat', 'assets-db/images/rat2.png'),
					this.load.image('rat_smoking', 'assets-db/images/rat_smoking.png'),
					this.load.image('rat_drunk', 'assets-db/images/rat_drunk.png'),
					this.load.spritesheet('spider', 'assets-db/images/spider_spritesheet3.png', 132, 111),
					this.load.spritesheet(
						'cute_bat',
						'assets-db/images/newnew_bat_spritesheet2.png',
						160,
						80
					),
					this.load.spritesheet(
						'graveGhost',
						'assets-db/images/graveGhost_spritesheet.png',
						80,
						100
					),
					this.load.spritesheet('fish', 'assets-db/images/fishlol2.png', 70, 32),
					this.load.spritesheet('clam', 'assets-db/images/clam_spritesheet3.png', 75, 59),
					this.load.spritesheet('fatMan', 'assets-db/images/fatMan_spritesheet.png', 39, 47),
					this.load.spritesheet('toaster', 'assets-db/images/toaster_spritesheet.png', 60, 38),
					this.load.spritesheet('zombie1', 'assets-db/images/zombies/zombie1.png', 82, 95),
					this.load.spritesheet('zombie2', 'assets-db/images/zombies/zombie2.png', 82, 95),
					this.load.spritesheet('zombie3', 'assets-db/images/zombies/zombie3.png', 82, 95),
					this.load.spritesheet('zombie4', 'assets-db/images/zombies/zombie4.png', 82, 95),
					this.load.spritesheet('zombie5', 'assets-db/images/zombies/zombie5.png', 71, 95),
					this.load.spritesheet('zombie6', 'assets-db/images/zombies/zombie6.png', 69, 95),
					this.load.spritesheet('zombie7', 'assets-db/images/zombies/zombie7.png', 63, 95),
					this.load.spritesheet('zombie8', 'assets-db/images/zombies/zombie8.png', 79, 95),
					this.load.spritesheet('zombie9', 'assets-db/images/zombies/zombie9.png', 72, 95),
					this.load.spritesheet('gunbug', 'assets-db/images/gunbug_spritesheet.png', 50, 45),
					this.load.image('gunbug_bullet', 'assets-db/images/gunbug_bullet.png'),
					this.load.spritesheet('dust', 'assets-db/images/new_dust_spritesheet.png', 50, 48),
					this.load.spritesheet('dust_bullet', 'assets-db/images/dust_bullet.png', 10, 10),
					this.load.spritesheet('baker', 'assets-db/images/baker_spritesheet.png', 74, 70),
					this.load.spritesheet('crab', 'assets-db/images/crab_spritesheet.png', 96, 45),
					this.load.spritesheet('gull', 'assets-db/images/gull_test_spritesheet.png', 60, 31),
					this.load.image('gullDung', 'assets-db/images/gullDung.png'),
					this.load.spritesheet('loaf', 'assets-db/images/loaf_spritesheet.png', 60, 99),
					this.load.image('pearl', 'assets-db/images/pearl.png'),
					this.load.image('toast', 'assets-db/images/toast.png'),
					this.load.image('gKnot1', 'assets-db/images/gKnot1.png'),
					this.load.image('gKnot2', 'assets-db/images/gKnot2.png'),
					this.load.image('gKnot3', 'assets-db/images/gKnot3.png'),
					this.load.image('cRoll1', 'assets-db/images/cRoll1.png'),
					this.load.image('cRoll2', 'assets-db/images/cRoll2.png'),
					this.load.image('cRoll3', 'assets-db/images/cRoll3.png'),
					this.load.image('indianaRoll', 'assets-db/images/indianaRoll3.png'),
					this.load.image('platform_updown', 'assets-db/images/platform.png'),
					this.load.image('platform_square', 'assets-db/images/platform_square.png'),
					this.load.image('platform', 'assets-db/images/platform_leftright3.png'),
					this.load.image('platform_falling', 'assets-db/images/platform_falling.png'),
					this.load.image('crate', 'assets-db/images/crate3.png'),
					this.load.image('crate_metal', 'assets-db/images/crate_metal.png'),
					this.load.image('spikeFalling', 'assets-db/images/spike_falling.png'),
					this.load.image('spike', 'assets-db/images/spike0.png'),
					this.load.image('cage', 'assets-db/images/cage.png'),
					this.load.image('breadMaker', 'assets-db/images/breadMaker3.png'),
					this.load.image('pressChild2Small', 'assets-db/images/pressChild2Small.png'),
					this.load.image('pressChild2', 'assets-db/images/pressChild2.png'),
					this.load.image('pressChildXL', 'assets-db/images/pressChildXL.png'),
					this.load.image('door', 'assets-db/images/door_beta.png'),
					this.load.image('doorlol', 'assets-db/images/door_lol.png'),
					this.load.image('doorSideways', 'assets-db/images/door_beta_sideways.png'),
					this.load.image('autoDoor', 'assets-db/images/autoDoor.png'),
					this.load.image('elevator', 'assets-db/images/elevator.png'),
					this.load.image('chainLift', 'assets-db/images/elevator.png'),
					this.load.image('chainLiftChild', 'assets-db/images/chainLiftChild2.png'),
					this.load.spritesheet(
						'springLauncher',
						'assets-db/images/springLauncher_spritesheet.png',
						250,
						45
					),
					this.load.image('zTrapGate', 'assets-db/images/zTrapGate2.png'),
					this.load.spritesheet('fire', 'assets-db/images/fire_spritesheet_TEST2.png', 50, 100),
					this.load.spritesheet('buzzsaw', 'assets-db/images/buzzsaw_spritesheet.png', 98, 99),
					this.load.spritesheet('hatch', 'assets-db/images/hatch_spritesheet.png', 100, 50),
					this.load.image('zElevator', 'assets-db/images/zElevator2.png'),
					this.load.image('breadCart', 'assets-db/images/breadCart.png'),
					this.load.image('breadCartButts', 'assets-db/images/breadCartButts.png'),
					this.load.spritesheet(
						'realBigFish',
						'assets-db/images/realBigFish_spritesheet.png',
						414,
						159
					),
					this.load.spritesheet(
						'conveyer',
						'assets-db/images/conveyerLeft_spritesheet.png',
						220,
						25
					),
					this.load.spritesheet('switch', 'assets-db/images/switch_spritesheet.png', 50, 50),
					this.load.image('button', 'assets-db/images/button.png'),
					this.load.image('powerupItem', 'assets-db/images/powerupItem.png'),
					this.load.image('safety cap', 'assets-db/images/hatNew.png'),
					this.load.image('gold_key', 'assets-db/images/gold_key.png')),
				this.load.image('donut1', 'assets-db/images/donut.png'),
				this.load.image('donut2', 'assets-db/images/donut2.png'),
				this.load.image('donut3', 'assets-db/images/donut3.png'),
				this.load.image('donut4', 'assets-db/images/donut4.png'),
				this.load.image('donut5', 'assets-db/images/donut5.png'),
				this.game.device.desktop &&
					(this.load.image('health1', 'assets-db/images/health1.png'),
					this.load.image('health2', 'assets-db/images/health2.png'),
					this.load.image('hotSauce', 'assets-db/images/hotSauce.png'),
					this.load.image('pills', 'assets-db/images/pillsDrBl.png'),
					this.load.image('eyeball', 'assets-db/images/eyeball.png'),
					this.load.image('brain', 'assets-db/images/brain.png'),
					this.load.image('spleen', 'assets-db/images/spleen.png'),
					this.load.image('skull', 'assets-db/images/skull.png'),
					this.load.image('real_heart', 'assets-db/images/real_heart.png'),
					this.load.image('blood1', 'assets-db/images/blood1.png'),
					this.load.image('blood2', 'assets-db/images/blood2.png'),
					this.load.image('blood3', 'assets-db/images/blood3.png'),
					this.load.image('blood4', 'assets-db/images/blood4.png'),
					this.load.image('blood5', 'assets-db/images/blood5.png'),
					this.load.image('blood6', 'assets-db/images/blood6.png'),
					this.load.image('blood7', 'assets-db/images/blood7.png'),
					this.load.image('blood8', 'assets-db/images/blood8.png'),
					this.load.image('crumb1', 'assets-db/images/crumbs/crumb1.png'),
					this.load.image('crumb2', 'assets-db/images/crumbs/crumb2.png'),
					this.load.image('crumb3', 'assets-db/images/crumbs/crumb3.png'),
					this.load.image('crumb4', 'assets-db/images/crumbs/crumb4.png'),
					this.load.image('crumb5', 'assets-db/images/crumbs/crumb5.png'),
					this.load.image('crumb6', 'assets-db/images/crumbs/crumb6.png'),
					this.load.image('tEmit1', 'assets-db/images/toasterEmit/tEmit1.png'),
					this.load.image('tEmit2', 'assets-db/images/toasterEmit/tEmit2.png'),
					this.load.image('tEmit3', 'assets-db/images/toasterEmit/tEmit3.png'),
					this.load.image('tEmit4', 'assets-db/images/toasterEmit/tEmit4.png'),
					this.load.image('tEmit5', 'assets-db/images/toasterEmit/tEmit5.jpg'),
					this.load.image('goalEmit1', 'assets-db/images/goalEmit/goalEmit1.png'),
					this.load.image('goalEmit2', 'assets-db/images/goalEmit/goalEmit2.png'),
					this.load.image('goalEmit3', 'assets-db/images/goalEmit/goalEmit3.png'),
					this.load.image('goalEmit4', 'assets-db/images/goalEmit/goalEmit4.png'),
					this.load.image('goalEmit5', 'assets-db/images/goalEmit/goalEmit5.png'),
					this.load.image('pearlEmit', 'assets-db/images/pearlEmit.png'),
					this.load.image('plank', 'assets-db/images/plank.png'),
					this.load.image('plankMetal', 'assets-db/images/plankMetal.png'),
					this.load.image('platEmit1', 'assets-db/images/platEmit1.png'),
					this.load.image('platEmit2', 'assets-db/images/platEmit2.png'),
					this.load.image('doorEmit', 'assets-db/images/doorEmit.png'),
					this.load.image('yay1', 'assets-db/images/celebrate/yay_pink.png'),
					this.load.image('yay2', 'assets-db/images/celebrate/yay_yellow.png'),
					this.load.image('yay3', 'assets-db/images/celebrate/yay_green.png'),
					this.load.image('yay4', 'assets-db/images/celebrate/yay_purple.png'),
					this.load.image('yay5', 'assets-db/images/celebrate/yay_orange.png'),
					this.load.image('yay6', 'assets-db/images/celebrate/yay_teal.png'),
					this.load.image('yay7', 'assets-db/images/celebrate/yay_blueLight.png'),
					this.load.image('yay8', 'assets-db/images/celebrate/yay_blueDark.png'),
					this.load.image('yay9', 'assets-db/images/celebrate/yay_greenLight.png'),
					this.load.image('yay10', 'assets-db/images/celebrate/yay_red.png'),
					this.load.image('zombie_e1', 'assets-db/images/zombie_emitter/zombie_emitter1.png'),
					this.load.image('zombie_e2', 'assets-db/images/zombie_emitter/zombie_emitter2.png'),
					this.load.image('unburyEmit1', 'assets-db/images/unburyEmit/unburyEmit1.png'),
					this.load.image('unburyEmit2', 'assets-db/images/unburyEmit/unburyEmit2.png'),
					this.load.image('unburyEmit3', 'assets-db/images/unburyEmit/unburyEmit3.png'),
					this.load.image('unburyEmit4', 'assets-db/images/unburyEmit/unburyEmit4.png'),
					this.load.image('hideIndianaEmit1', 'assets-db/images/hideIndianaEmit1.png'),
					this.load.image('hideIndianaEmit3', 'assets-db/images/hideIndianaEmit3.png'),
					this.load.image('hotEmit1', 'assets-db/images/hotEmit/hotEmit1.png'),
					this.load.image('hotEmit2', 'assets-db/images/hotEmit/hotEmit2.png'),
					this.load.image('hotEmit3', 'assets-db/images/hotEmit/hotEmit3.png'),
					this.load.image('invincibleEmit4', 'assets-db/images/invincibleEmit4.png'),
					this.load.image('water_drop', 'assets-db/images/water_drop.png'),
					this.load.spritesheet('cheat', 'assets-db/images/cheat_spritesheet.png', 28, 22),
					this.load.image('25x25_trans', 'assets-db/images/25x25_trans.png'),
					this.load.image('jacko', 'assets-db/images/pumpkin_sketch.png'),
					this.load.image('controls', 'assets-db/images/controls.png'),
					this.load.image('title_controls', 'assets-db/images/title_controls2.png'),
					this.load.image('beachBall', 'assets-db/images/beachBall2.png'),
					this.load.image('menuArrow', 'assets-db/images/menuArrow.png'),
					this.load.image('statsChar', 'assets-db/images/statsChar.png'),
					this.load.image('hideIndiana', 'assets-db/images/hideIndiana.png'),
					this.load.image('unburyGraveGround', 'assets-db/images/unburyGraveGround.png'),
					this.load.spritesheet(
						'plsUnbury_spritesheet',
						'assets-db/images/plsUnbury_spritesheet.png',
						74,
						60
					),
					this.load.spritesheet(
						'fakeWater',
						'assets-db/images/fakeWater_spritesheet.png',
						475,
						800
					),
					this.load.image('fakeSand', 'assets-db/images/fakeSand2.png'),
					this.load.image('graveSecret', 'assets-db/images/graveSecret.png')),
				this.load.spritesheet('kaboom', 'assets-db/images/explosion2.png', 128, 128),
				this.load.spritesheet('factory', 'assets-db/images/factory_spritesheet2.png', 300, 300),
				this.load.image('factoryHoleBG', 'assets-db/images/factoryHoleBG.png'),
				this.load.image('menuBG', 'assets-db/images/menuBG.png'),
				this.load.image('menuFG', 'assets-db/images/menuFG3.png'),
				this.load.image('donut1_black', 'assets-db/images/donut1_black.png'),
				this.load.image('donut2_black', 'assets-db/images/donut2_black.png'),
				this.load.image('donut3_black', 'assets-db/images/donut3_black.png'),
				this.load.image('invisPlat25', 'assets-db/images/invisible_plats/invisPlat25.png'),
				this.load.image('invisPlat50', 'assets-db/images/invisible_plats/invisPlat50.png'),
				this.load.image('invisPlat75', 'assets-db/images/invisible_plats/invisPlat75.png'),
				this.load.image('invisPlat100', 'assets-db/images/invisible_plats/invisPlat100.png'),
				this.load.image('invisPlat125', 'assets-db/images/invisible_plats/invisPlat125.png'),
				this.load.image('invisPlat150', 'assets-db/images/invisible_plats/invisPlat150.png'),
				this.load.image('invisPlat175', 'assets-db/images/invisible_plats/invisPlat175.png'),
				this.load.audio('donutboyIntro', [
					'assets-db/audio/fresh_audio/donutBoyIntro2.mp3',
					'assets-db/audio/fresh_audio/donutBoyIntro2.ogg'
				]),
				this.load.audio('donutboy', [
					'assets-db/audio/fresh_audio/donut_boy_loop.mp3',
					'assets-db/audio/fresh_audio/donut_boy_loop.ogg'
				]),
				this.game.device.desktop &&
					(this.load.audio('getGoal', 'assets-db/audio/fresh_audio/goal_get.mp3'),
					this.load.audio('bonkBeachMusic', [
						'assets-db/audio/fresh_audio/bonk_beach_loop.mp3',
						'assets-db/audio/fresh_audio/bonk_beach_loop.ogg'
					]),
					this.load.audio('level3music', [
						'assets-db/audio/fresh_audio/essooess_loop.mp3',
						'assets-db/audio/fresh_audio/essooess_loop.ogg'
					]),
					this.load.audio('ditzy', [
						'assets-db/audio/fresh_audio/ditzy_loop.mp3',
						'assets-db/audio/fresh_audio/ditzy_loop.ogg'
					]),
					this.load.audio('uhoh', 'assets-db/audio/fresh_audio/uh_oh.mp3'),
					this.load.audio('grandeIcedLatte', [
						'assets-db/audio/fresh_audio/gil_radio_loop.mp3',
						'assets-db/audio/fresh_audio/gil_radio_loop.ogg'
					]),
					this.load.audio('creditsTune', [
						'assets-db/audio/fresh_audio/you_done_it_loop.mp3',
						'assets-db/audio/fresh_audio/you_done_it_loop.ogg'
					]),
					this.load.audio('breadSmelter', [
						'assets-db/audio/fresh_audio/bread_smelter_loop.mp3',
						'assets-db/audio/fresh_audio/bread_smelter_loop.ogg'
					]),
					this.load.audio('level2music', [
						'assets-db/audio/fresh_audio/wicked_dwellings_loop.mp3',
						'assets-db/audio/fresh_audio/wicked_dwellings_loop.ogg'
					]),
					this.load.audio('recordScratchSFX', 'assets-db/audio/recordScratchSFX.mp3'),
					this.load.audio('jump', 'assets-db/audio/jumpNew.mp3'),
					this.load.audio('swimSFX', 'assets-db/audio/swim3SFX.mp3'),
					this.load.audio('pickupSFX', 'assets-db/audio/pickupSFX.mp3'),
					this.load.audio('gunshot', 'assets-db/audio/gunshot.mp3'),
					this.load.audio('pistolSFX', 'assets-db/audio/pistol2.mp3'),
					this.load.audio('shotgunSFX', 'assets-db/audio/shotgunSFX2.mp3'),
					this.load.audio('speak', 'assets-db/audio/speak.mp3'),
					this.load.audio('badSpeak', 'assets-db/audio/badSpeak.mp3'),
					this.load.audio('death1', 'assets-db/audio/death1.mp3'),
					this.load.audio('death2', 'assets-db/audio/death2.mp3'),
					this.load.audio('death3', 'assets-db/audio/death3.mp3'),
					this.load.audio('crateBreak', 'assets-db/audio/crateBreak.mp3'),
					this.load.audio('platBreakSFX', 'assets-db/audio/platBreakSFX.mp3'),
					this.load.audio('crateBreakMetal', 'assets-db/audio/crateBreakMetal.mp3'),
					this.load.audio('eatSFX', 'assets-db/audio/eatSFX.mp3'),
					this.load.audio('playerHurtSFX', 'assets-db/audio/playerHurt.mp3'),
					this.load.audio('yay', 'assets-db/audio/yay2.mp3'),
					this.load.audio('pop1', 'assets-db/audio/pop1.mp3'),
					this.load.audio('pop2', 'assets-db/audio/pop2.mp3'),
					this.load.audio('pop3', 'assets-db/audio/pop3.mp3'),
					this.load.audio('beachBall1SFX', 'assets-db/audio/beachBall1SFX.mp3'),
					this.load.audio('beachBall2SFX', 'assets-db/audio/beachBall2SFX.mp3'),
					this.load.audio('beachBall3SFX', 'assets-db/audio/beachBall3SFX.mp3'),
					this.load.audio('boing', 'assets-db/audio/boing.mp3'),
					this.load.audio('milonSFX', 'assets-db/audio/milonBubble.mp3'),
					this.load.audio('laserSFX', 'assets-db/audio/laserSFX.mp3'),
					this.load.audio('frisbeeSFX', 'assets-db/audio/frisbeeSFX2.mp3'),
					this.load.audio('frisbeeThudSFX', 'assets-db/audio/frisbeeThudSFX.mp3'),
					this.load.audio('zombieSFX1', 'assets-db/audio/zombieSFX1.mp3'),
					this.load.audio('evilLaughSFX', 'assets-db/audio/evilLaughSFX.mp3'),
					this.load.audio('lockedDoorSFX', 'assets-db/audio/lockedDoorSFX.mp3'),
					this.load.audio('gateOpeningSFX', 'assets-db/audio/gateOpeningSFX.mp3'),
					this.load.audio('staticSFX', 'assets-db/audio/static.mp3'),
					this.load.audio('rockCrumbleSFX', 'assets-db/audio/rockCrumbleSFX.mp3'),
					this.load.audio('spikeFallSFX', 'assets-db/audio/spikeFallSFX.mp3'),
					this.load.audio('rockDestroySFX', 'assets-db/audio/rockDestroySFX.mp3'),
					this.load.audio('puggsyDieSFX', 'assets-db/audio/puggsyDieSFX.mp3'),
					this.load.audio('beep1SFX', 'assets-db/audio/beep1SFX.mp3'),
					this.load.audio('beep2SFX', 'assets-db/audio/beep2SFX.mp3'),
					this.load.audio('switchOnSFX', 'assets-db/audio/switchOnSFX.mp3'),
					this.load.audio('switchOffSFX', 'assets-db/audio/switchOffSFX.mp3'),
					this.load.audio('fireSFX', 'assets-db/audio/fireSFX.mp3'),
					this.load.audio('wooshSFX', 'assets-db/audio/wooshSFX.mp3'),
					this.load.audio('toasterSFX', 'assets-db/audio/toasterSFX.mp3'),
					this.load.audio('tinkSFX', 'assets-db/audio/tinkSFX.mp3'),
					this.load.audio('doughSlap1SFX', 'assets-db/audio/doughSlap1SFX.mp3'),
					this.load.audio('doughSlap2SFX', 'assets-db/audio/doughSlap2SFX.mp3'),
					this.load.audio('doughSlap3SFX', 'assets-db/audio/doughSlap3SFX.mp3'),
					this.load.audio('slapSFX', 'assets-db/audio/slapSFX.mp3'),
					this.load.audio('toasterHitSFX', 'assets-db/audio/toasterHitSFX.mp3'),
					this.load.audio('toasterSmashSFX', 'assets-db/audio/toasterSmashSFX.mp3'),
					this.load.audio('ceilingCrash2SFX', 'assets-db/audio/ceilingCrash2SFX.mp3'),
					this.load.audio('weaponChangeSFX', 'assets-db/audio/weaponChangeBetaSFX.mp3'),
					this.load.audio('chainPullSFX', 'assets-db/audio/chainPull2SFX.mp3'),
					this.load.audio('elevatorSFX', 'assets-db/audio/elevatorSFX.mp3'),
					this.load.audio('checkpointBellSFX', 'assets-db/audio/checkpointBellSFX.mp3'),
					this.load.audio('spiderDieSFX', 'assets-db/audio/spiderDieSFX.mp3'),
					this.load.audio('spiderHurtSFX', 'assets-db/audio/spiderHurtSFX.mp3'),
					this.load.audio('weaponSwitchSFX', 'assets-db/audio/weaponSwitchSFX.mp3'),
					this.load.audio('weaponGetSFX', 'assets-db/audio/weaponGetSFX.mp3'),
					this.load.audio('bakerDeflectSFX', 'assets-db/audio/bakerDeflectSFX.mp3'),
					this.load.audio('poofOutSFX', 'assets-db/audio/poofOutSFX.mp3'),
					this.load.audio('poofInSFX', 'assets-db/audio/poofInSFX.mp3'),
					this.load.audio('dust1SFX', 'assets-db/audio/dust1SFX.mp3'),
					this.load.audio('dust2SFX', 'assets-db/audio/dust2SFX.mp3'),
					this.load.audio('fatMan1SFX', 'assets-db/audio/fatMan1SFX.mp3'),
					this.load.audio('fatMan2SFX', 'assets-db/audio/fatMan2SFX.mp3'),
					this.load.audio('fatMan3SFX', 'assets-db/audio/fatMan3SFX.mp3'),
					this.load.audio('fatMan4SFX', 'assets-db/audio/fatMan4SFX.mp3'),
					this.load.audio('baker1SFX', 'assets-db/audio/baker1SFX.mp3'),
					this.load.audio('baker2SFX', 'assets-db/audio/baker2SFX.mp3'),
					this.load.audio('squeak1SFX', 'assets-db/audio/squeak1SFX.mp3'),
					this.load.audio('squeak2SFX', 'assets-db/audio/squeak2SFX.mp3'),
					this.load.audio('seagull1SFX', 'assets-db/audio/seagull1SFX.mp3'),
					this.load.audio('seagull2SFX', 'assets-db/audio/seagull2louderSFX.mp3'),
					this.load.audio('fish1SFX', 'assets-db/audio/fish1SFX.mp3'),
					this.load.audio('fish2SFX', 'assets-db/audio/fish2SFX.mp3'),
					this.load.audio('fishAlarmSFX', 'assets-db/audio/fishAlarmSFX.mp3'),
					this.load.audio('donutAlarmSFX', 'assets-db/audio/donutAlarmSFX.mp3'),
					this.load.audio('waterDrainSFX', 'assets-db/audio/waterDrainSFX.mp3'),
					this.load.audio('bat1SFX', 'assets-db/audio/bat1SFX.mp3'),
					this.load.audio('bat2SFX', 'assets-db/audio/bat2SFX.mp3'),
					this.load.audio('buttonSqueakSFX', 'assets-db/audio/buttonSqueakSFX.mp3'),
					this.load.audio('clamCrackSFX', 'assets-db/audio/clamCrackSFX.mp3'),
					this.load.audio('clamHitSFX', 'assets-db/audio/clamHitSFX.mp3'),
					this.load.audio('crabCrackSFX', 'assets-db/audio/crabCrackSFX.mp3'),
					this.load.audio('crabHitSFX', 'assets-db/audio/crabHitSFX.mp3'),
					this.load.audio('indianaRollingSFX', 'assets-db/audio/indianaRollingSFX.mp3'),
					this.load.audio('indianaBoomSFX', 'assets-db/audio/indianaBoomSFX.mp3'),
					this.load.audio('pearlCrackSFX', 'assets-db/audio/pearlCrackSFX.mp3'),
					this.load.audio('glassCrackSFX', 'assets-db/audio/glassCrackSFX.mp3'),
					this.load.audio('autoDoorOpenSFX', 'assets-db/audio/autoDoorOpenSFX.mp3'),
					this.load.audio('alreadyHaveMGSSFX', 'assets-db/audio/alreadyHaveMGSSFX.mp3'),
					this.load.audio('splashSFX', 'assets-db/audio/splashSFX.mp3'),
					this.load.audio('door2SFX', 'assets-db/audio/door4SFX.mp3'),
					this.load.audio('gateCloseSFX', 'assets-db/audio/gateCloseSFX.mp3'),
					this.load.audio('sizzleSFX', 'assets-db/audio/sizzleSFX.mp3'),
					this.load.audio('zombieHit1SFX', 'assets-db/audio/zombieHits/zombieHit1SFX.mp3'),
					this.load.audio('zombieHit2SFX', 'assets-db/audio/zombieHits/zombieHit2SFX.mp3'),
					this.load.audio('zombieHit3SFX', 'assets-db/audio/zombieHits/zombieHit3SFX.mp3'),
					this.load.audio('zombieHit4SFX', 'assets-db/audio/zombieHits/zombieHit4SFX.mp3'),
					this.load.audio('zombieHit5SFX', 'assets-db/audio/zombieHits/zombieHit5SFX.mp3'),
					this.load.image('tiles_dec', 'assets-db/images/tilesetDEC.png'),
					this.load.image('pbgtest', 'assets-db/images/paralaxBGTest.png'),
					this.load.image('beachParallaxBG', 'assets-db/images/beachParallaxBG.png'),
					this.load.tilemap(
						'levelT',
						'assets-db/levels/levelT.json',
						null,
						Phaser.Tilemap.TILED_JSON
					),
					this.load.tilemap(
						'levelV',
						'assets-db/levels/levelV.json',
						null,
						Phaser.Tilemap.TILED_JSON
					),
					this.load.tilemap(
						'levelW',
						'assets-db/levels/levelW.json',
						null,
						Phaser.Tilemap.TILED_JSON
					),
					this.load.tilemap(
						'levelX',
						'assets-db/levels/levelX.json',
						null,
						Phaser.Tilemap.TILED_JSON
					),
					this.load.tilemap(
						'levelY',
						'assets-db/levels/levelY.json',
						null,
						Phaser.Tilemap.TILED_JSON
					),
					this.load.tilemap(
						'levelZ',
						'assets-db/levels/levelZ.json',
						null,
						Phaser.Tilemap.TILED_JSON
					),
					this.load.tilemap(
						'levelAA',
						'assets-db/levels/levelAA.json',
						null,
						Phaser.Tilemap.TILED_JSON
					),
					this.load.text('level18data', 'assets-db/levels/levelData18.json'),
					this.load.text('level20data', 'assets-db/levels/levelData20.json'),
					this.load.text('level21data', 'assets-db/levels/levelData21.json'),
					this.load.text('level22data', 'assets-db/levels/levelData22.json'),
					this.load.text('level23data', 'assets-db/levels/levelData23.json'),
					this.load.text('level24data', 'assets-db/levels/levelData24.json'),
					this.load.text('level25data', 'assets-db/levels/levelData25.json'));
		},
		create: function () {
			this.state.start('Menu');
		}
	}),
	((FaceGame = FaceGame || {}).RealBigFish = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			this.game.physics.arcade.enableBody(this),
			this.scale.setTo(1),
			(this.body.allowGravity = !1),
			(this.customParams = { originalX: this.x, originalY: this.y, moveEight: this.x }),
			(this.anim = this.animations.add('fish_move', [0, 1], 1, !0)),
			(this.nervousAnim = this.animations.add('fish_nervous', [2, 3], 2, !0)),
			(this.sadAnim = this.animations.add('fish_sad', [4, 5], 2, !0)),
			this.anim.play(),
			(this.autoCull = !0);
	}),
	(FaceGame.RealBigFish.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.RealBigFish.prototype.constructor = FaceGame.RealBigFish),
	(FaceGame.RealBigFish.prototype.update = function () {
		(this.position.y =
			50 * Math.cos((2 * this.customParams.moveEight) / 67) + this.customParams.originalY),
			(this.customParams.moveEight = this.customParams.moveEight + 0.5);
	}),
	((FaceGame = FaceGame || {}).SecretCharacter = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			(this.player = h),
			this.anchor.setTo(0.5),
			this.game.physics.arcade.enableBody(this),
			this.scale.setTo(0.5),
			(this.body.allowGravity = !0),
			(this.customParams = {
				originalX: this.x,
				originalY: this.y,
				moveEight: this.x,
				name: i,
				got: !1,
				scale: 0.5,
				beginFade: !1
			});
	}),
	(FaceGame.SecretCharacter.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.SecretCharacter.prototype.constructor = FaceGame.SecretCharacter),
	(FaceGame.SecretCharacter.prototype.update = function () {
		if (
			(this.player.x <= this.x ? this.scale.setTo(-0.5, 0.5) : this.scale.setTo(0.5, 0.5),
			this.customParams.got && this.y >= this.customParams.originalY)
		) {
			var t = 100 + 20 * Math.random();
			this.body.velocity.y = -t;
		}
		this.customParams.beginFade &&
			((this.alpha = this.alpha - 0.008), this.alpha <= 0 && this.destroy());
	}),
	((FaceGame = FaceGame || {}).ShotgunBullet = function (t, e, s) {
		Phaser.Sprite.call(this, t, e, s, 'bullet'),
			(this.game = t),
			this.anchor.setTo(0.5),
			(this.checkWorldBounds = !0),
			(this.outOfBoundsKill = !0),
			(this.customParams = { timesCollided: 0, activatedSwitch: !1 });
	}),
	(FaceGame.ShotgunBullet.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.ShotgunBullet.prototype.constructor = FaceGame.ShotgunBullet),
	(FaceGame.ShotgunBullet.prototype.update = function () {
		(this.x < this.game.camera.x - 100 ||
			this.x > this.game.camera.x + this.game.camera.width + 100) &&
			0 == this.customParams.timesCollided &&
			this.kill();
	}),
	((FaceGame = FaceGame || {}).Spike = function (t, e, s, i, a, h, o, r) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = r),
			(this.player = o),
			this.anchor.setTo(0.5),
			(this.spikeFallSFX = this.game.add.audio('spikeFallSFX')),
			(this.spikeFallSFX.volume = 0.2),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			a || (a = 'up'),
			h || (h = 'false'),
			(this.customParams = { direction: a, falling: h, fallActivated: !1, timesCollided: 0 }),
			'up' == a
				? (this.angle = 0)
				: 'left' == a
				? ((this.angle = -90), this.scale.setTo(-1, 1))
				: 'right' == a
				? (this.angle = 90)
				: 'down' == a && ((this.angle = 180), this.scale.setTo(-1, 1)),
			(this.autoCull = !0);
	}),
	(FaceGame.Spike.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Spike.prototype.constructor = FaceGame.Spike),
	(FaceGame.Spike.prototype.update = function () {
		if ('true' == this.customParams.falling) {
			var t = this.x - this.player.x,
				e = this.y - this.player.y;
			Math.abs(t) < 80 &&
				e < 0 &&
				this.y > this.game.camera.y &&
				!this.customParams.fallActivated &&
				this.fall(),
				this.customParams.fallActivated &&
					this.y > this.game.camera.y + this.game.camera.height &&
					this.kill();
		}
	}),
	(FaceGame.Spike.prototype.fall = function () {
		this.spikeFallSFX.play(),
			(this.customParams.fallActivated = !0),
			(this.body.allowGravity = !0),
			(this.body.gravity.y = 1 * this.game.state.callbackContext.GAME_GRAVITY);
	}),
	((FaceGame = FaceGame || {}).SpringLauncher = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.player = o),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			this.scale.setTo(0.75),
			(this.customParams = {
				originalY: this.y,
				playerOnTop: !1,
				playerOnTopTimer: 0,
				launchTimer: 0,
				launching: !1,
				launchSpeed: h || -900,
				resetPosition: !1
			}),
			(this.beep1SFX = this.game.add.audio('beep1SFX')),
			(this.beep1SFX.volume = 0.2),
			(this.beep2SFX = this.game.add.audio('beep2SFX')),
			(this.beep2SFX.volume = 0.2),
			(this.boingSFX = this.game.add.audio('boing')),
			(this.boingSFX.volume = 0.2),
			this.distanceFromPlayer,
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			(this.body.immovable = !0),
			(this.body.checkCollision.down = !1),
			(this.body.checkCollision.left = !1),
			(this.body.checkCollision.right = !1),
			(this.frame = 0),
			(this.autoCull = !0);
	}),
	(FaceGame.SpringLauncher.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.SpringLauncher.prototype.constructor = FaceGame.SpringLauncher),
	(FaceGame.SpringLauncher.prototype.update = function () {
		this.game.time.now > this.customParams.playerOnTopTimer && (this.customParams.playerOnTop = !1),
			this.customParams.playerOnTop
				? this.customParams.launchTimer++
				: ((this.customParams.launchTimer = 0), (this.frame = 0)),
			1 == this.customParams.launchTimer
				? ((this.frame = 1), this.beep1SFX.play())
				: 27 == this.customParams.launchTimer
				? ((this.frame = 2), this.beep1SFX.play())
				: 53 == this.customParams.launchTimer
				? ((this.frame = 3), this.beep1SFX.play())
				: 80 == this.customParams.launchTimer &&
				  ((this.frame = 4), this.beep2SFX.play(), this.boingSFX.play(), this.spring()),
			this.customParams.launching && (this.body.velocity.y = this.customParams.launchSpeed),
			!this.customParams.launching &&
				this.y >= this.customParams.originalY &&
				!this.customParams.resetPosition &&
				((this.body.velocity.y = 0),
				(this.customParams.resetPosition = !0),
				(this.y = this.customParams.originalY));
	}),
	(FaceGame.SpringLauncher.prototype.spring = function () {
		(this.customParams.launching = !0),
			(this.customParams.resetPosition = !1),
			this.game.time.events.add(
				100,
				function () {
					(this.customParams.launching = !1), (this.body.velocity.y = 200), (this.frame = 0);
				},
				this
			);
	}),
	((FaceGame = FaceGame || {}).SwitchNew = function (t, e, s, i, a, h, o, r, l, n, m, c) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.ID = c),
			(this.game = t),
			(this.tilemap = m),
			this.anchor.setTo(0.5),
			this.game.physics.arcade.enableBody(this),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			this.scale.setTo(0.8),
			(this.frame = 0),
			a || (a = void 0),
			h || (h = void 0),
			o || (o = void 0),
			(r = void 0 == r ? 'classic' : r),
			(this.switchOnSFX = this.game.add.audio('switchOnSFX')),
			(this.switchOnSFX.volume = 0.2),
			(this.switchOffSFX = this.game.add.audio('switchOffSFX')),
			(this.switchOffSFX.volume = 0.2),
			'oneTime' == r &&
				((this.glassCrackSFX = this.game.add.audio('glassCrackSFX')),
				(this.glassCrackSFX.volume = 0.2)),
			(this.customParams = {
				groupToAffect: a,
				switchTie: h,
				secondGroupToAffect: o,
				timeLastHit: 0,
				switchType: r,
				broken: !1
			}),
			(this.customFunction = l),
			(this.resetIndiana = n),
			(this.body.checkCollision.up = !1),
			(this.autoCull = !0);
	}),
	(FaceGame.SwitchNew.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.SwitchNew.prototype.constructor = FaceGame.SwitchNew),
	(FaceGame.SwitchNew.prototype.update = function () {
		'overlapOnly' == this.customParams.switchType &&
			1 == this.frame &&
			this.customParams.timeLastHit < FaceGame.GameState.time.now - 10 &&
			this.onOff();
	}),
	(FaceGame.SwitchNew.prototype.onOff = function () {
		this.customParams.broken ||
			(0 == this.frame ? (this.frame = 1) : (this.frame = 0),
			this.x > this.game.camera.x &&
				this.x < this.game.camera.x + this.game.camera.width &&
				(0 == this.frame ? this.switchOffSFX.play() : this.switchOnSFX.play()),
			(this.customParams.timeLastHit = FaceGame.GameState.time.now),
			this.customParams.groupToAffect &&
				FaceGame.GameState.switchChange(
					this.customParams.groupToAffect,
					this.customParams.switchTie,
					this,
					this.customParams.secondGroupToAffect
				),
			this.customFunction && FaceGame.GameState[this.customFunction](),
			'oneTime' == this.customParams.switchType &&
				((this.frame = 2), this.glassCrackSFX.play(), (this.customParams.broken = !0)));
	}),
	((FaceGame = FaceGame || {}).Thwomp = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.player = h),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			this.scale.setTo(1),
			(this.customParams = { abovePlayer: !0, onTheGround: !1 }),
			this.distanceFromPlayer,
			this.game.physics.arcade.enableBody(this),
			(this.body.collideWorldBounds = !0),
			(this.body.allowGravity = !1),
			(this.body.immovable = !0),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY + 1e3),
			(this.urg = this.game.add.audio('urg')),
			(this.urg.volume = 0.2);
	}),
	(FaceGame.Thwomp.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Thwomp.prototype.constructor = FaceGame.Thwomp),
	(FaceGame.Thwomp.prototype.update = function () {
		this.player.bottom >= this.bottom
			? (this.customParams.abovePlayer = !0)
			: this.player.bottom < this.bottom && (this.customParams.abovePlayer = !1),
			(this.distanceFromPlayer = this.x - this.player.x),
			Math.abs(this.distanceFromPlayer) < 100 && this.customParams.abovePlayer && this.fall(),
			this.customParams.onTheGround ||
				(this.body.blocked.down && (this.urg.play(), (this.customParams.onTheGround = !0)));
	}),
	(FaceGame.Thwomp.prototype.scheduleJump = function () {}),
	(FaceGame.Thwomp.prototype.fall = function () {
		this.body.allowGravity = !0;
	}),
	((FaceGame = FaceGame || {}).Toast = function (t, e, s, i, a) {
		Phaser.Sprite.call(this, t, e, s, a),
			(this.game = t),
			this.game.physics.arcade.enableBody(this),
			this.anchor.setTo(0.5),
			(this.body.gravity.y = this.game.state.callbackContext.GAME_GRAVITY),
			this.scale.setTo(0.4),
			(this.health = 0.01),
			(this.spinSpeed = i || 0);
	}),
	(FaceGame.Toast.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Toast.prototype.constructor = FaceGame.Toast),
	(FaceGame.Toast.prototype.update = function () {
		if (((this.angle = this.angle + this.spinSpeed), this.bottom + 4 >= this.game.world.height)) {
			if (!this.alive) return;
			this.kill();
		}
	}),
	(FaceGame.Toast.prototype.damage = function (t, e, s) {
		Phaser.Sprite.prototype.damage.call(this, t, e, s),
			(this.health -= t),
			this.health <= 0 &&
				((this.enemyEmitter = this.game.add.emitter(this.x, this.y, 18)),
				this.enemyEmitter.makeParticles([
					'crumb1',
					'crumb2',
					'crumb3',
					'crumb4',
					'crumb5',
					'crumb6'
				]),
				this.game.physics.arcade.enable(this.enemyEmitter),
				(this.enemyEmitter.minParticleScale = 0.5),
				(this.enemyEmitter.maxParticleScale = 0.5),
				(this.enemyEmitter.gravity = this.game.state.callbackContext.GAME_GRAVITY),
				'jump' == e
					? (this.enemyEmitter.setYSpeed(-250, 250), this.enemyEmitter.setXSpeed(-250, 250))
					: 'shoot' == e &&
					  ('right' == s
							? (this.enemyEmitter.setXSpeed(250, 350), this.enemyEmitter.setYSpeed(-100, 100))
							: 'left' == s &&
							  (this.enemyEmitter.setXSpeed(-250, -350), this.enemyEmitter.setYSpeed(-100, 100))),
				this.enemyEmitter.start(!0, 1e3, null, 8),
				this.kill());
	}),
	((FaceGame = FaceGame || {}).Weapon = function (t, e, s, i, a, h, o) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5),
			(this.x = Math.round(e)),
			(this.y = Math.round(s));
		var r = this.y;
		this.game.physics.arcade.enableBody(this),
			(this.body.checkCollision.up = !1),
			(this.body.allowGravity = !1),
			this.scale.setTo(0.8),
			(this.customParams = { name: h, index: o }),
			(this.itemTween = this.game.add.tween(this)),
			this.itemTween
				.to({ y: r - 5 }, 700)
				.to({ y: r }, 700)
				.loop()
				.start(),
			(this.autoCull = !0);
	}),
	(FaceGame.Weapon.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.Weapon.prototype.constructor = FaceGame.Weapon),
	(FaceGame.Weapon.prototype.update = function () {}),
	((FaceGame = FaceGame || {}).ZTrapGate = function (t, e, s, i, a, h) {
		Phaser.Sprite.call(this, t, e, s, i),
			(this.game = t),
			(this.tilemap = a),
			this.anchor.setTo(0.5, 0),
			this.game.physics.arcade.enableBody(this),
			(this.body.immovable = !0),
			this.scale.setTo(1, 0),
			(this.body.allowGravity = !1),
			(this.customParams = { originalX: this.x, originalY: this.y, moveEight: this.x }),
			(this.zGateCloseTween = this.game.add.tween(this.scale)),
			this.zGateCloseTween.to({ y: 1 }, 200),
			(this.zGateOpenTween = this.game.add.tween(this.scale)),
			this.zGateOpenTween.to({ y: 0 }, 200),
			(this.gateCloseSFX = this.game.add.audio('gateCloseSFX')),
			(this.gateCloseSFX.volume = 0.1),
			(this.autoCull = !0);
	}),
	(FaceGame.ZTrapGate.prototype = Object.create(Phaser.Sprite.prototype)),
	(FaceGame.ZTrapGate.prototype.constructor = FaceGame.ZTrapGate),
	(FaceGame.ZTrapGate.prototype.update = function () {}),
	(FaceGame.ZTrapGate.prototype.closeIt = function () {
		this.zGateCloseTween.start(), this.gateCloseSFX.play();
	}),
	(FaceGame.ZTrapGate.prototype.openIt = function () {
		this.zGateOpenTween.start();
	}),
	((FaceGame = FaceGame || {}).dim = FaceGame.getGameLandscapeDimensions(675, 350)),
	(FaceGame.game = new Phaser.Game(FaceGame.dim.w, FaceGame.dim.h, Phaser.CANVAS)),
	FaceGame.game.state.add('Boot', FaceGame.BootState),
	FaceGame.game.state.add('Preload', FaceGame.PreloadState),
	FaceGame.game.state.add('Menu', FaceGame.MenuState),
	FaceGame.game.state.add('Game', FaceGame.GameState),
	FaceGame.game.state.start('Boot');
