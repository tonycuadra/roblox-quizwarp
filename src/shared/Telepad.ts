export type TelepadModel = Model & {
    TeleportSound: Sound;
    Portal: BasePart & {
        SurfaceGui: SurfaceGui & {
            TextLabel: TextLabel;
        };
    };
};
