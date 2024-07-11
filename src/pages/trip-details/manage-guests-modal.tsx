import { AtSign, CheckCircle2, CircleDashed, Plus, X } from "lucide-react";
import { Button } from "../../components/button";
import React, { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";


interface ManageGuestsModalProps {
    closeModalManageGuests: () => void
    participants: {
        id: string
        name: string
        email: string
        is_confirmed: string
    }[]
}

export function ManageGuestsModal({
    closeModalManageGuests,
    participants
}: ManageGuestsModalProps) {

    const { tripId } = useParams();



    async function confirmGuest(e: React.MouseEvent<HTMLButtonElement>) {

        const participantId = e.currentTarget.getAttribute('id')

        console.log(`/participants/${participantId}/confirm`, "url");

        await api.patch(`/participants/${participantId}/confirm`);

    }


    async function inviteNewGuest(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString()

        if (!email) {
            return
        }

        if (participants.find(participant => participant.email === email)) {
            return;
        }

        await api.post(`/trips/${tripId}/invites`, {
            email
        })

        window.document.location.reload();

    }


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[800px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                <div className="space-y-2">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Gerencie seus convidados</h2>
                        <button type="button" onClick={closeModalManageGuests}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">Selecione os participantes a serem confirmados</p>

                </div>
                {/* <div className="flex flex-wrap gap-2">
                    {participants.map(participant => {
                        return (
                            <button onClick={confirmGuest} key={participant.id} id={participant.id} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2 hover:bg-zinc-500">
                                <span className="text-zinc-388">{participant.email}</span>
                                {participant.is_confirmed ? (
                                    <CheckCircle2 className="text-lime-300 size-5 shrink-0" />
                                ) : (
                                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                                )}

                            </button>
                        )
                    })}
                </div> */}

                <div className="w-full h-px bg-zinc-800" />

                <h2 className="text-lg font-semibold">Adicione novos convidados</h2>
                <p className="text-sm text-zinc-400">Adicione os emails dos novos convidados</p>

                <div className="flex flex-wrap gap-2">
                    {participants.map(email => {
                        return (
                            <div key={email.id} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                                <span className="text-zinc-388">{email.email}</span>

                            </div>
                        )
                    })}
                </div>

                <form onSubmit={inviteNewGuest} className="p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center ">
                    <div className='px-2 flex items-center flex-1 gap-2'>
                        <AtSign className="text-zinc-400 size-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite o e-mail do convidado" className="bg-transparent text-lg placehold-zinc-400 w-40 outline-none flex-1" />
                    </div>
                    <Button type="submit" variant="primary" size="default">
                        Convidar <Plus className="size-5" />
                    </Button>

                </form>

            </div>
        </div>
    )
}