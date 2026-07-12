"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  answerd: {
    label: "正答済",
    color: "hsl(var(--chart-2))",
  },
  not_answerd: {
    label: "未正答",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig

export function ChartAnswerdCount({
  answered_count,
  not_answered_count,
}: {
  answered_count: number
  not_answered_count: number
}) {
  const chartData = [
    {
      answerd: answered_count,
      not_answerd: not_answered_count,
    },
  ]
  const totalQuizCount = answered_count + not_answered_count
  const correctRate = Math.round(answered_count / totalQuizCount * 100)

  return (
    <Card className="flex flex-col w-[350px] max-w-[400px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Quiz Progress</CardTitle>
        <CardDescription>正答済みクイズの数</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center pb-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-[2/1.35] w-full max-w-[300px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={95}
            outerRadius={135}
            cy="90%"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 24}
                          className="fill-foreground text-xl font-bold"
                        >
                          {answered_count.toLocaleString()}/{totalQuizCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 6}
                          className="fill-muted-foreground"
                        >
                          quizzes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="answerd"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-answerd)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="not_answerd"
              fill="var(--color-not_answerd)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {correctRate === 100 ? (
          <div className="flex items-center gap-2 font-medium leading-none text-amber-600 dark:text-amber-300">
            ⭐全問正答です🎉⭐
          </div>
        ) : correctRate > 0 ? (
          <div className="flex items-center gap-2 font-medium leading-none text-amber-600 dark:text-amber-300">
            ⭐{correctRate}%も正答しました！⭐
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium leading-none text-amber-600 dark:text-amber-300">
            ⭐まだチャレンジしていません⭐
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
