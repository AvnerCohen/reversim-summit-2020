const theme = {
  // the website's color scheme
  color: {
    background_1: 'rgba(81, 39, 255, 0.9)',
    background_3: 'rgb(51, 18, 188)',
    text_1: 'white',
  },
  // spaces used for padding and margins
  space: {
    s: '5px',
    m: '10px',
    l: '15px',
    xl: '20px',
    xxl: '50px',
  },
  // media queries parameters
  mq: {
    mobile: '(max-width: 480px)',
    tablet: '(max-width: 768px)',
    tablet_landscape: '(max-width: 1200px)', //though classic tablet landscape is 1024px, 1200 worked better for Footer.js
    laptop: '(max-width: 1600px)',
  },
};

export default theme;
