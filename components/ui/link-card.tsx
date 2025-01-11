"use client";

import React, { useEffect, useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import { fetchOGPs, OgpObjects } from "@/components/actions/fetchOGPs";

type LinkCardProps = {
  url: string;
  ogps?: OgpObjects;
};



export const LinkCard = ({ url, ogps }: LinkCardProps) => {
  const [localOgps, setLocalOgps] = useState<OgpObjects>(ogps || {});

  useEffect(() => {
    if (!ogps) {
      const fetchMetadata = async () => {
        const res = await fetchOGPs(url);
        if (res.error) {
          console.log(res.error);
        }
        if (res.ogps) {
          setLocalOgps(res.ogps);
        }
      };
      fetchMetadata();
    }
  }, [url, ogps]);

  if (!localOgps) {
    return <SkeletonLinkItem />;
  }

  return (
    <div className="w-fit hover:scale-[1.02] transition rounded-xl shadow-lg">
      <Link rel="noopener noreferrer" href={localOgps.href ?? "/" } target="_blank">
        <div className="flex flex-col md:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {localOgps.image && localOgps.image !== "/no-image.png" && (
            <img
              src={localOgps.image}
              className="object-cover w-full
                min-w-[9rem] max-w-[18rem] h-[9rem]
                rounded-t-xl md:rounded-r-none md:rounded-l-xl"
              alt="image"
            />
          )}
          <div className="flex flex-col p-3 bg-secondary w-fit
              min-w-[9rem] max-w-[18rem] h-[6rem]
              md:min-w-[24rem] md:max-w-[24rem] md:h-[9rem]
              rounded-b-xl md:rounded-l-none md:rounded-r-xl">
            <h6 className="line-clamp-2 text-sm mb-2 font-semibold shrink-0 grow-0">
              {localOgps.title}
            </h6>
            <p className="hidden md:line-clamp-2 text-xs text-secondary-foreground">
              {localOgps.description}
            </p>
            <p className="shrink-0 text-xs pt-2 text-muted-foreground grow-0 flex items-center justify-start md:justify-end space-x-1 truncate">
              <LinkIcon className="w-4 h-4" />
              <span>{localOgps.domain}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const SkeletonLinkItem = () => {
  return (
    <div className="w-fit hover:scale-[1.02] transition rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="object-cover w-full
              min-w-[9rem] max-w-[18rem] h-[9rem]
              rounded-t-xl md:rounded-r-none md:rounded-l-xl">
          <Skeleton className="w-full h-full bg-secondary" />
        </div>
        <div className="flex flex-col p-3 bg-secondary
              min-w-[6rem] max-w-[18rem] h-[6rem]
              md:min-w-[24rem] md:max-w-[24rem] md:h-[9rem]
              rounded-b-xl md:rounded-l-none md:rounded-r-xl">
          <Skeleton className="w-full h-6 mb-2" />
          <div className="hidden md:block">
            <Skeleton className="w-full h-8" />
          </div>
          <div className="shrink-0 text-xs pt-2 flex items-center justify-start md:justify-end space-x-1">
            <LinkIcon className="w-4 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};




export const LinkCardWithoutLink = ({ url, ogps }: LinkCardProps) => {
  const [localOgps, setLocalOgps] = useState<OgpObjects>(ogps || {});

  useEffect(() => {
    if (!ogps) {
      const fetchMetadata = async () => {
        const res = await fetchOGPs(url);
        if (res.error) {
          console.log(res.error);
        }
        if (res.ogps) {
          setLocalOgps(res.ogps);
        }
      };
      fetchMetadata();
    }
  }, [url, ogps]);

  if (!localOgps) {
    return <SkeletonLinkItem />;
  }

  return (
    <div className="w-fit transition rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {localOgps.image && localOgps.image !== "/no-image.png" && (
          <img
            src={localOgps.image}
            className="object-cover w-full
              min-w-[9rem] max-w-[18rem] h-[9rem]
              rounded-t-xl md:rounded-r-none md:rounded-l-xl"
            alt="image"
          />
        )}
        <div className="flex flex-col p-3 bg-secondary w-fit
            min-w-[9rem] max-w-[18rem] h-[6rem]
            md:min-w-[24rem] md:max-w-[24rem] md:h-[9rem]
            rounded-b-xl md:rounded-l-none md:rounded-r-xl">
          <h6 className="line-clamp-2 text-sm mb-2 font-semibold shrink-0 grow-0">
            {localOgps.title}
          </h6>
          <p className="hidden md:line-clamp-2 text-xs text-secondary-foreground">
            {localOgps.description}
          </p>
          <p className="shrink-0 text-xs pt-2 text-muted-foreground grow-0 flex items-center justify-start md:justify-end space-x-1 truncate">
            <LinkIcon className="w-4 h-4" />
            <span>{localOgps.domain}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
