import Cover from "./components/Cover";
import Story from "./components/Story";
import Gallery from "./components/Gallery";
import EventDate from "./components/EventDate";
import Countdown from "./components/Countdown";
import Location from "./components/Location";
import Music from "./components/Music";
import Itinerary from "./components/Itinerary";
import Footer from "./components/Footer";
import { invitation } from "./data/ana-y-carlos";

export default function Home() {
  return (
    <main>
      {invitation.cover.enabled && (
        <Cover invitation={invitation} />
      )}

      {invitation.story.enabled && (
        <Story invitation={invitation} />
      )}

      {invitation.gallery.enabled && (
        <Gallery invitation={invitation} />
      )}

      <EventDate invitation={invitation} />

      {invitation.countdown.enabled && (
        <Countdown invitation={invitation} />
      )}

      <Location invitation={invitation} />


      {invitation.itinerary.enabled && (
          <Itinerary invitation={invitation} />
        )}

      {invitation.music.enabled && (
        <Music music={invitation.music} />
      )}

      <Footer invitation={invitation} />
    </main>
  );
}