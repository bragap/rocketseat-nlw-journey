import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ChangeLocalAndDateProps {
    closeChangeLocalAndDate: () => void
}

export function ChangeLocalAndDate({
    closeChangeLocalAndDate
}: ChangeLocalAndDateProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
    const {tripId} = useParams();



    function openDatePicker() {
        return setIsDatePickerOpen(true);
    }
    function closeDatePicker() {
        return setIsDatePickerOpen(false);
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) : null

    async function changeLocalDateFunc(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();


        const data = new FormData(event.currentTarget);
        const destination = data.get('destination')?.toString();
        const starts_at = eventStartAndEndDates?.from;
        const ends_at = eventStartAndEndDates?.to;

      const response = await api.put(`/trips/${tripId}`, {
            destination,
            starts_at,
            ends_at
        }
        )
        console.log(response.data)
        

    }


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[800px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                <div className="space-y-2">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Altere o local e a data</h2>
                        <button type="button" onClick={closeChangeLocalAndDate} >
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">Insira as novas informações abaixo</p>

                </div>


                <form onSubmit={changeLocalDateFunc} className="space-y-3">

                    <div className='h-14 px-5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <MapPin className="size-5 text-zinc-400" />
                        <input
                            type="text"
                            name="destination"
                            placeholder="Para onde você vai?"
                            className="bg-transparent text-lg placehold-zinc-400 outline-none flex-1"
                        />
                    </div>

                    <div className='h-14 flex-1 px-5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <button
                            onClick={openDatePicker}
                            className='flex items-center gap-2 text-left w-[300px]'>
                            <Calendar className="size-5 text-zinc-400" />
                            <span className=" text-lg text-zinc-400 w-40 flex-1">
                            {displayedDate || " Quando? "}
                            </span>
                        </button>
                    </div>

                



                    <Button variant="primary" size="full">
                        Confirmar alteração
                    </Button>

                </form>

                {isDatePickerOpen && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                            <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                                <div className="space-y-2">

                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold">Selecione a data</h2>
                                        <button type="button" onClick={closeDatePicker}>
                                            <X className="size-5 text-zinc-400" />
                                        </button>
                                    </div>

                                </div>

                                <DayPicker mode="range"  selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}