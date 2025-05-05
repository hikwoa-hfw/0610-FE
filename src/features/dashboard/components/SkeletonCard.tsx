import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200"/>
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-4xl">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200" />
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200" />
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-4xl">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200" />
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xl">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200"/>
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-4xl">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200" />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            <Skeleton className="h-[30px] w-[405px] bg-gray-200" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkeletonCard;
