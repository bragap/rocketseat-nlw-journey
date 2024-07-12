import { Mail, User, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (name: string) => void
    setOwnerEmail: (email: string) => void
    destination: string
    eventStartAndEndDates: DateRange | undefined
    errorMessage: boolean
    tripAlreadyExists: boolean
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerEmail,
    setOwnerName,
    destination,
    eventStartAndEndDates,
    errorMessage,
    tripAlreadyExists
}: ConfirmTripModalProps) {

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null


   
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[800px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                <div className="space-y-2">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
                        <button type="button" onClick={closeConfirmTripModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">Para concluir a criação da viagem para <span className="font-semibold text-zinc-100"> {destination} </span>nas datas de <span className="font-semibold text-zinc-100"> {displayedDate} </span>preencha seus dados abaixo:</p>

                </div>


                <form onSubmit={createTrip} className="space-y-3">

                    <div className='h-14 px-5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <User className="text-zinc-400 size-5" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Seu nome completo"
                            className="bg-transparent text-lg placehold-zinc-400 w-full outline-none"
                            onChange={e => setOwnerName(e.target.value)}
                        />
                    </div>

                    <div className='h-14 px-5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Mail className="text-zinc-400 size-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Seu e-mail pessoal"
                            className=" bg-transparent text-lg placehold-zinc-400 w-full outline-none flex-1"
                            onChange={e => setOwnerEmail(e.target.value)}
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-sm font-semibold text-red-500">Preencha todos os campos necessários!</p>
                    )}

                    {tripAlreadyExists && (
                        <p className="text-sm font-semibold text-red-500">Já existe uma viagem com essas informações!</p>
                    )}

                    <Button type="submit" variant="primary" size="full">
                        Confirmar criação de viagem
                    </Button>

                </form>

            </div>
        </div>
    )
}