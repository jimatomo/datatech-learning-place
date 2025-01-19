import { fetchOGPs, OgpObjects } from "@/components/actions/fetchOGPs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { LinkCardWithoutLink } from "@/components/ui/link-card"
import Link from "next/link"
import { BookOpen } from "lucide-react"

type Reference = {
  title: string;
  url: string;
  ogps?: OgpObjects;
}

export async function getReferenceOgps(references: Reference[]) {
  return Promise.all(references.map(async (reference: Reference) => {
    const res = await fetchOGPs(reference.url);
    return { ...reference, ogps: res.ogps };
  }));
}

// 参考文献セクション用の新しいコンポーネント
export async function QuizReferences({ references }: { references: Reference[] }) {
  const referenceOgps = await getReferenceOgps(references);

  return (
    <Accordion type="single" collapsible className="w-full max-w-lg px-4 py-10">
      <AccordionItem value={`references`}>
        <AccordionTrigger className="flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          <span>参考文献</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col items-center w-full gap-2">
            {referenceOgps.map((reference: Reference, index: number) => (
              <HoverCard key={`hover-${index}`}>
                <HoverCardTrigger asChild>
                  <div className="w-fit">
                    <Link href={reference.url} rel="noopener noreferrer" target="_blank"
                    className="underline hover:text-primary text-muted-foreground">
                      {reference.title}
                    </Link>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-full">
                  <div className="flex justify-center">
                    <LinkCardWithoutLink url={reference.url} ogps={reference.ogps} />
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
