use anchor_lang::prelude::*;

declare_id!("4BBrKAMPPapLUnZrwiXN5akvtt3g69C5ZtqAGFSDNGTU");

pub const ANCHOR_DISCIMINITOR_SIZE: usize = 8;

#[program]
mod sol_todo {
    use super::*;

    pub fn initialize_todo(
        ctx: Context<InitializeTodo>,
        id: u8,
        text: String,
        completed: bool,
    ) -> Result<()> {
        msg!("Greetings from {}", ctx.program_id);

        let user_pub_key = ctx.accounts.user.key();

        msg!("User({}) -> {}", user_pub_key, text);

        ctx.accounts.todo.set_inner(Todo {
            id,
            text: text.as_bytes().to_vec(),
            completed,
        });

        Ok(())
    }

    pub fn update_todo(ctx: Context<UpdateTodo>, id: u8) -> Result<()> {
        ctx.accounts.todo.completed = true;
        msg!("Todo with id -> {} marked as complated", id);
        Ok(())
    }

    pub fn remove_todo(ctx: Context<RemoveTodo>, id: u8) -> Result<()> {
        msg!("Removing todo with id -> {} ", id);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(id:u8)]
pub struct InitializeTodo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCIMINITOR_SIZE + Todo::MAX_SIZE,
        seeds = [b"todo",user.key().as_ref(),&[id]],
        bump
        )]
    pub todo: Account<'info, Todo>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id: u8)]
pub struct UpdateTodo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [b"todo",user.key().as_ref(),&[id]],
        bump
        )]
    pub todo: Account<'info, Todo>,
}

#[derive(Accounts)]
#[instruction(id: u8)]
pub struct RemoveTodo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [b"todo",user.key().as_ref(),&[id]],
        bump,
        close=user
        )]
    pub todo: Account<'info, Todo>,
}

#[account]
pub struct Todo {
    id: u8,
    text: Vec<u8>,
    completed: bool,
}

impl Todo {
    pub const MAX_SIZE: usize = 4 + 32 + 1 + 1; // ID (4 bytes) + text (32 bytes) + bool (1 byte)
}
