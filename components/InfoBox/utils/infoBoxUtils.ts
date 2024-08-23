import type {InfoBox, InfoBoxComponent, PublicationContainerComponent} from "~/core/types/publications";
import type {ContentComponent} from "~/core/types/contentComponents";

export const handleInfoBox = (component: PublicationContainerComponent): ContentComponent => {
    return {
        id: component.id,
        type: component.component,
        content: component.containers.infobox[0]
    };
}