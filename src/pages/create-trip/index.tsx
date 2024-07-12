import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';
import { Loader } from '../../components/loader';

export function CreateTripPage() {

  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com.br', "jhon@acme.com"
  ]);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
  const [isConfirmTripModalOpen, setIsconfirmTripModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)
  const [tripAlreadyExists, setTripAlreadyExists] = useState(false);
  const [noEmailAdd, setNoEmailAdd] = useState(false);
  const [emailAlreadyAdd, setEmailAlreadyAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsconfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsconfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString()



    if (!email) {
      setEmailAlreadyAdd(false);
      setNoEmailAdd(true);
      return;
    }

    if (emailsToInvite.includes(email)) {
      setNoEmailAdd(false);
      setEmailAlreadyAdd(true);
      return;
    }

    setNoEmailAdd(false);
    setEmailAlreadyAdd(false);
    setEmailsToInvite([...emailsToInvite, email]);


    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)
    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination || !ownerName || !ownerEmail || !eventStartAndEndDates) {
      setErrorMessage(true);
      return;
    }


    setErrorMessage(false);

    try {

      setTripAlreadyExists(false);
      setIsLoading(true);

      const response = await api.post('/trips', {
        destination,
        starts_at: eventStartAndEndDates?.from,
        ends_at: eventStartAndEndDates?.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail
      })

      const { tripId } = response.data;

      setTimeout(() => {
        setIsLoading(false);
        navigate(`/trips/${tripId}`)
      }, 2000);

    }
    catch {
      // pegar o status de erro 400
      if (400) {
        setTripAlreadyExists(true)
        return;
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">

          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}

          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}

        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br></br>
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade.</a></p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          removeEmailFromInvites={removeEmailFromInvites}
          emailAlreadyAdd={emailAlreadyAdd}
          noEmailAdd={noEmailAdd}
        />
      )}


      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          destination={destination}
          eventStartAndEndDates={eventStartAndEndDates}
          errorMessage={errorMessage}
          tripAlreadyExists={tripAlreadyExists}
        />

      )}


      {isLoading && <Loader />}
    </div>


  )
}