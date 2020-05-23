import ReactionRoleHandler from "./ReactionRoleHandler";

class GuildConfig {
    private _guild: string;
    private _prefix: string;

    public readonly reactionRole: ReactionRoleHandler;

    constructor(guild: string, config: any) {
        this._guild = guild;
        this._prefix = config.command.prefix;

        this.reactionRole = new ReactionRoleHandler(guild);
    }

    public get Prefix(){
        return this._prefix;
    }
    public setPrefix(prefix: string){
        this._prefix = prefix;
    }
}

export default GuildConfig;
