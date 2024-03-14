import { Header } from "@/components/Header/Header";
import { SidePanel } from "@/components/SidePanel/SidePanel";
import { MapWrapper } from "@/components/MapWrapper/MapWrapper";
import { Flex } from "antd"

export function Home(): JSX.Element {
  return (
    <div>
      <Header />
      <Flex justify="space-between">
        <SidePanel />
        <MapWrapper />
      </Flex>
    </div>
  );
}