"use client";

import { fetchOGPs, OgpObjects } from "@/components/actions/fetchOGPs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { LinkCardWithoutLink } from "@/components/ui/link-card"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { handleTrackEvent } from "@/app/lib/frontend_event_api"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"

type Reference = {
  title: string;
  url: string;
  ogps?: OgpObjects;
}

// 参考文献セクション用の新しいコンポーネント
export function QuizReferences({ references }: { references: Reference[] }) {
  const [referenceOgps, setReferenceOgps] = useState<Reference[]>(references);
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    const fetchOgps = async () => {
      const ogps = await Promise.all(references.map(async (reference: Reference) => {
        const res = await fetchOGPs(reference.url);
        return { ...reference, ogps: res.ogps };
      }));
      setReferenceOgps(ogps);
    };
    fetchOgps();
  }, [references]);

  const handleReferenceClick = async (reference: Reference) => {
    await handleTrackEvent({
      user_id: user?.sub?.toString() ?? "",
      path: pathname,
      event_name: "reference_link_click",
      properties: {
        reference_title: reference.title,
        reference_url: reference.url,
      },
    });
  };

  return (
    <TooltipProvider>
      <Accordion type="single" collapsible className="w-full max-w-2xl px-4 py-10">
        <AccordionItem value={`references`}>
          <AccordionTrigger className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>参考文献</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-center w-full gap-2">
              {referenceOgps.map((reference: Reference, index: number) => (
                <Tooltip key={`tooltip-${index}`}>
                  <TooltipTrigger asChild>
                    <div className="w-fit">
                      <Link 
                        href={reference.url} 
                        rel="noopener noreferrer" 
                        target="_blank"
                        onClick={() => {
                          handleReferenceClick(reference);
                        }}
                        className="underline hover:text-primary text-muted-foreground"
                      >
                        {reference.title}
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    className="w-auto max-w-none p-0 border-0 shadow-lg"
                    side="top"
                    align="center"
                    sideOffset={8}
                  >
                    <div className="flex justify-center">
                      <LinkCardWithoutLink url={reference.url} ogps={reference.ogps} />
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TooltipProvider>
  );
}
