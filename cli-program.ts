import { Command } from 'commander';
import { CreateChangeSetCommand } from '~commands/create-organization-changeset';
import { DeleteStacksCommand } from '~commands/delete-stacks';
import { DescribeStacksCommand } from '~commands/describe-stacks';
import { ExecuteChangeSetCommand } from '~commands/execute-organization-changeset';
import { InitOrganizationCommand } from '~commands/init-organization';
import { InitPipelineCommand } from '~commands/init-organization-pipeline';
import { PerformTasksCommand } from '~commands/perform-tasks';
import { PrintStacksCommand } from '~commands/print-stacks';
import { UpdateOrganizationCommand } from '~commands/update-organization';
import { UpdateStacksCommand } from '~commands/update-stacks';
import { ValidateStacksCommand } from '~commands/validate-stacks';
import { ValidateTasksCommand } from '~commands/validate-tasks';

export class CliProgram {

    public static Create(): Command {
        const p = new CliProgram();
        return p.getCommand();
    }

    private static GetVersion(): string {
        let pjson;
        try {
            pjson = require('../package.json');
        } catch (err) {
            pjson = require('./package.json');
        }
        return pjson.version;
    }

    public commandNames: string[];

    private readonly program: Command;

    constructor() {
        this.program = new Command();
        this.program.version(CliProgram.GetVersion(), '-v, --version');
        this.program.description('aws organization formation');

        new CreateChangeSetCommand(this.program);
        new DeleteStacksCommand(this.program);
        new DescribeStacksCommand(this.program);
        new ExecuteChangeSetCommand(this.program);
        new InitPipelineCommand(this.program);
        new InitOrganizationCommand(this.program);
        new PerformTasksCommand(this.program);
        new PrintStacksCommand(this.program);
        new UpdateOrganizationCommand(this.program);
        new UpdateStacksCommand(this.program);

        new ValidateStacksCommand(this.program);
        new ValidateTasksCommand(this.program);
    }

    public getCommand(): Command {
        return this.program;
    }
}
