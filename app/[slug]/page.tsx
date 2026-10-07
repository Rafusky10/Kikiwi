import Cover from "../components/Cover";
import Story from "../components/Story";
import Gallery from "../components/Gallery";
import EventDate from "../components/EventDate";
import Countdown from "../components/Countdown";
import Location from "../components/Location";
import Music from "../components/Music";
import Footer from "../components/Footer";
import Itinerary from "../components/Itinerary";
import DressCode from "../components/DressCode";
import Gifts from "../components/Gifts";
import { invitations } from "../data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InvitationPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const invitation =
    invitations[slug as keyof typeof invitations];

  if (!invitation) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-stone-800">
            Invitación no encontrada
          </h1>

          <p className="mt-4 text-stone-500">
            La invitación que buscas no existe.
          </p>
        </div>
      </main>
    );
  }

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

      {invitation.dressCode.enabled && (
        <DressCode invitation={invitation} />
      )}

      {invitation.gifts.enabled && (
        <Gifts invitation={invitation} />
      )}

      {invitation.music.enabled && (
        <Music music={invitation.music} />
      )}

      <Footer invitation={invitation} />
    </main>
  );
}