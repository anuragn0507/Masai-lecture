function outer() {
    const x = 5;
    if (Math.random() > 0.5) {
      const y = 6;
      return () => console.log(x, y);
    }
  }
  
  outer()(); 
  