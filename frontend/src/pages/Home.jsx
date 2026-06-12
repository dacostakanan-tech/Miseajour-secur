import React from 'react';
import Hero from '../components/Hero';
import PromoCards from '../components/PromoCards';
import Advantages from '../components/Advantages';
import AppPromo from '../components/AppPromo';
import News from '../components/News';
import OtherSpaces from '../components/OtherSpaces';

export default function Home() {
  return (
    <>
      <Hero />
      <PromoCards />
      <Advantages />
      <AppPromo />
      <News />
      <OtherSpaces />
    </>
  );
}
