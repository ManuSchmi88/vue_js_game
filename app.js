new Vue({
	el: '#app',
	data: {
		gameIsRunning : false,
		playerHealth : 100,
		monsterHealth : 100,
		turns: []
	},
	methods: {
		startNewGame: function() {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
		},
		attack: function() {
			var damage = this.calcDamage(3,10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits Monster for ' + damage
			});
			if (this.checkWin()){
				return;
			};
			this.monsterAttack();
		},
		specialAttack: function() {
			var damage = this.calcDamage(10,20);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits Monster hard for ' + damage
			});
			if (this.checkWin()){
				return;
			};
			this.monsterAttack(4,12);

		},
		heal: function() {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10
			} else {
				this.playerHealth = 100;
			}
			this.turns.unshift({
				isPlayer: true,
				text: 'Player heals for 10'
			})
			this.monsterAttack()
		},
		giveUp: function() {
			this.gameIsRunning = false;

		},
		calcDamage: function(min, max) {
			var damage = Math.max(Math.floor(Math.random() * max + 1, min));
			return damage;
		},
		checkWin: function() {
			if (this.monsterHealth <= 0) {
				if (confirm("You won! Play again?")) {
					this.startNewGame();
					return;
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			else if (this.playerHealth <= 0) {
				if (confirm("You lost! Play again?")) {
					this.startNewGame();
					return;
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		},
		monsterAttack: function() {
			var damage = this.calcDamage(4,12);
			this.playerHealth -= damage;
			this.turns.unshift({
				isPlayer: false,
				text: 'Monster hits Player for ' + damage
			});
			this.checkWin()

		},
	}
})
