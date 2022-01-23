function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = new Vue({
  el: "#game",
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    disableButton() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      const attackValue = randomNumber(12, 5);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
      this.addLogMessage("player", "attack", attackValue);
    },
    attackPlayer() {
      const attackValue = randomNumber(15, 8);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      const attackValue = randomNumber(25, 10);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
      this.addLogMessage("player", "attack", attackValue);
    },
    healPlayer() {
      this.currentRound++;
      const healthValue = randomNumber(20, 8);
      if (this.playerHealth + healthValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healthValue;
      }
      this.addLogMessage("player", "heal", healthValue);
      this.attackPlayer();
    },
    resetGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.addLogMessage = [];
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
