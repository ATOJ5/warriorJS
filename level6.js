class Player {
  constructor() {
    this.health = 20;
    this.currentHealth = 20;
    this.attack = 5;
    this.position = 2;
    this.backRecorrido = false;
    this.direction = 'backward';
  }

  fullHealth(warrior) {
    return warrior.health() === this.health;
  }

  takingDamage(warrior) {
    return warrior.health() < this.currentHealth;
  }

  walkOrRest(warrior) {
    return this.takingDamage(warrior) || this.fullHealth(warrior)
      ? this.walkOrEscape(warrior)
      : warrior.rest();
  }

  doMovement(warrior){
    switch(this.direction){
      case 'backward':
      if (this.position >0){
        this.position -=1;
      break;
      }
      case 'forward':
      this.position +=1;
      break;
      default:
      warrior.think('no hubo movimiento y la posicion es' + position)
    }
  }

  attackOrRescue(warrior) {
    
    return warrior.feel(this.direction).getUnit()
      ? warrior.attack(this.direction)
      : warrior.rescue(this.direction);
  }

  backisDone(warrior) {
    if (this.position === 0) { 
      this.backRecorrido = true; 
    }
  }

  setDirection(warrior) {
    
    this.backisDone(warrior);
    if (this.backRecorrido) {
      this.direction='forward'
    } else{
      this.direction='backward'
    }
    this.doMovement(warrior);
    warrior.think(this.position);
  }

  changeDirection(warrior){
    if (this.direction == 'forward'){
      this.direction = 'backward'
    } else {
      this.direction = 'forward'
    }
    warrior.walk(this.direction);
  }

  walkOrEscape(warrior){

    return this.tocado(warrior)
      ? (this.changeDirection(warrior))
      : (warrior.walk(this.direction));
    
  }

  tocado(warrior){
    return warrior.health() < this.currentHealth * 70 / 100
  }

  playTurn(warrior) {
    warrior.feel(this.direction).isEmpty()
      ? (this.setDirection(warrior), this.walkOrRest(warrior))
      : (this.setDirection(warrior), this.attackOrRescue(warrior));

    this.currentHealth = warrior.health();
    
  }
}
