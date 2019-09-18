import Hero from '../components/Hero';
// import About from '../components/About';
// import Team from '../components/Team';
// import Register from '../components/Register';
import SpeakersSection from '../components/SpeakersSection';
import Location from '../components/Location';
import SponsorsSection from '../components/SponsorsComps/SponsorsSection';
// import TimelineSection from '../components/TimelineSection';

const homeSections = [
  {name: 'hero', el: Hero},
  // {name: 'about', el: About},
  // { name: "register", el: Register },
  // {name: 'speakers', el: SpeakersSection},
  // {name: 'timeline', el: TimelineSection},
  {name: 'sponsors', el: SponsorsSection},
  // {name: 'team', el: Team},
  {name: 'location', el: Location},
];

export default homeSections;
