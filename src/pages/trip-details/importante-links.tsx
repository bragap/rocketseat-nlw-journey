import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateLinkModal } from "./create-link-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Link {
    id: string
    title: string
    url: string
    tripd_id: string
}

export function ImportantLinks() {

    const [isModalAddLinkOpen, setIsModalAddLinkOpen] = useState(false);
    function openModalAddLink() {
        return setIsModalAddLinkOpen(true);
    }

    function closeModalAddLink() {
        return setIsModalAddLinkOpen(false);
    }

    const { tripId } = useParams();
    const [importantLinks, setImportantLinks] = useState<Link[]>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/links`)
            .then(response => setImportantLinks(response.data.links))
    }, [tripId]);


    return (
        <div className="space-y-6 ">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            {importantLinks && importantLinks.length > 0 ? (
                importantLinks.map(link => {
                    return (
                        <div key={link.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5 flex-1">
                                <span className="block font-medium text-zinc-100">{link.title}</span>
                                <a href={link.url} target="_blank" className="block font-medium text-xs text-zinc-400 truncate hover:text-zinc-200 ">{link.url}</a>
                            </div>
                            <Link2 className="text-zinc-400 size-5 shrink-0" />
                        </div>
                    )

                })
            ) : (
                <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                            <span className="block font-medium text-zinc-100">Nenhum link cadastrado</span>
                            <a href="#" className="block font-medium text-xs text-zinc-400 truncate hover:text-zinc-200 ">-</a>
                        </div>
                        <Link2 className="text-zinc-400 size-5 shrink-0" />
                    </div>
                </div>
            )}


            {isModalAddLinkOpen && (
                <CreateLinkModal closeModalAddLink={closeModalAddLink} />
            )}

            <Button onClick={openModalAddLink} variant="secondary" size="full">
                <Plus className="size-5" /> Cadastrar novo link
            </Button>
        </div>
    )
}