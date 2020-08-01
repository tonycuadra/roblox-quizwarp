export type Level = Model & {
    Walls: Folder & {
        BackWall: BasePart;
        LeftWall: BasePart;
        RightWall: BasePart;
        FrontWall: BasePart & {
            SurfaceGui: SurfaceGui & {
                LevelName: TextLabel;
                Question: TextLabel;
            }
        }
    };
    Telepads: Folder;
    StartLocation: BasePart;
};
