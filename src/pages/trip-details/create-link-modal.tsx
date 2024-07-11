import {  Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";
import { api } from "../../lib/axios";

interface CreateLinkModalProps{
closeModalAddLink: () => void
}

export function CreateLinkModal({
    closeModalAddLink
}: CreateLinkModalProps){

    const {tripId} = useParams();


    async function createLink(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const title = data.get('title')?.toString();
        const url = data.get('url')?.toString();

       await api.post(`/trips/${tripId}/links`,{
            title,
            url
        })

        window.document.location.reload();
    }


    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[800px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                <div className="space-y-2">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Cadastrar novo link</h2>
                        <button type="button" onClick={closeModalAddLink}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">Todos os convidados podem visualizar os links</p>

                </div>


                <form onSubmit={createLink} className="space-y-3">

                    <div className='h-14 px-5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Tag className="text-zinc-400 size-5" />
                        <input
                            type="text"
                            name="title"
                            placeholder="Nome do link" className="bg-transparent text-lg placehold-zinc-400 w-full outline-none" />
                    </div>

                    <div className='h-14 flex-1 px-5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Link2 className="text-zinc-400 size-5" />
                        <input
                            type="text"
                            name="url"
                            placeholder="Qual o link?"
                            className=" bg-transparent text-lg placehold-zinc-400 w-full outline-none flex-1" />
                    </div>



                    <Button variant="primary" size="full">
                        Adicionar link
                    </Button>

                </form>
            </div>
        </div>
    )
}