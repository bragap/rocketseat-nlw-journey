import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Loader } from "../../components/loader";


interface CreateActivityModalProps {
    closeCreateActivityModal: () => void
}

export function CreateActivityModal({
    closeCreateActivityModal
}: CreateActivityModalProps) {

    const { tripId } = useParams();
    const [noDataOrTitle, setNoDataOrTitle] = useState(false);
    const [alreadyExistsActivity, setAlreadyExistsActivity] = useState(false);
    const [activityOutofRange, setActivityOutofRange] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    async function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const title = data.get('title')?.toString();
        const occurs_at = data.get('occurs_at')?.toString();

        if (!title || !occurs_at) {
            setNoDataOrTitle(true);
            return;
        }

        setNoDataOrTitle(false);

        try {
            setIsLoading(true);
            const response = await api.post(`/trips/${tripId}/activities`, {
                title,
                occurs_at
            })
            setTimeout(() => {
                setIsLoading(false);
                window.document.location.reload();
            },2000)
            

            if(response.status === 400){
                setAlreadyExistsActivity(true);
                return;
            }

           

        } catch {
            setActivityOutofRange(true);
            console.log("erro")
        }


    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[800px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                <div className="space-y-2">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
                        <button type="button" onClick={closeCreateActivityModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">Todos os convidados podem visualizar as atividades</p>

                </div>


                <form onSubmit={createActivity} className="space-y-3">

                    <div className='h-14 px-5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Tag className="text-zinc-400 size-5" />
                        <input
                            type="text"
                            name="title"
                            placeholder="Qual a atividade?" className="bg-transparent text-lg placehold-zinc-400 w-full outline-none" />
                    </div>

                    <div className='h-14 flex-1 px-5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Calendar className="text-zinc-400 size-5" />
                        <input
                            type="datetime-local"
                            name="occurs_at"
                            placeholder="Data e horário da atividade"
                            className=" bg-transparent text-lg placehold-zinc-400 w-full outline-none flex-1" />
                    </div>

                    {noDataOrTitle && <p className="text-sm font-semibold text-red-500">Preencha todos os campos</p>}
                    {alreadyExistsActivity && <p className="text-sm font-semibold text-red-500">Essa atividade já foi cadastrada</p>}
                    {activityOutofRange && <p className="text-sm font-semibold text-red-500">Cadastre a atividade somente na data desse evento!</p>}
                    <Button variant="primary" size="full">
                        Salvar atividade
                    </Button>

                </form>
            </div>
            {isLoading && <Loader/>}
        </div>
    )
}