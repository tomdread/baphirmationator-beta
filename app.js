async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function randomIndexInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

fetchData('baphirmationator.json')
  .then(data => {
    for (let category in data.baphirmationator_data.baphirmation_categories) {
      shuffleArray(data.baphirmationator_data.baphirmation_categories[category].baphirmations);
    }

    const app = Vue.createApp({
      data() {
        return {
          baphirmationatorData: data.baphirmationator_data,
          baphirmationCategories: data.baphirmationator_data.baphirmation_categories,
          selectedCategory: null,
          currentBaphirmation: null,
          selectedCategoryDescription: null,
          selectedCategoryImage: null,
          delayTime: 666
        };
      },
      methods: {
        async selectCategory(category) {
          await new Promise(resolve => setTimeout(resolve, this.delayTime));
          this.selectedCategory = category;
          shuffleArray(data.baphirmationator_data.baphirmation_categories[category].baphirmations);
          this.selectedCategoryDescription = this.baphirmationCategories[category].description;
          this.selectedCategoryImage = this.baphirmationCategories[category].image_url;          
          this.currentBaphirmation = this.baphirmationCategories[category].baphirmations[0];
        },

        generateNextBaphirmation() {
          const baphirmations = this.baphirmationCategories[this.selectedCategory].baphirmations;
          const currentIndex = baphirmations.indexOf(this.currentBaphirmation);
          const delayTime = 666;
        
          setTimeout(() => {
            if (currentIndex !== baphirmations.length - 1) {
              this.currentBaphirmation = baphirmations[currentIndex + 1];
            } else {
              this.currentBaphirmation = baphirmations[0];
            }
          }, delayTime);
        }
      },
    });

    app.mount('#app');
  })
  .catch(error => {
    console.error('Error loading baphirmationator data:', error);
  });
