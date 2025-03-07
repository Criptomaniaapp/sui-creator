module TokenCreator::TokenCreator {
    use sui::object::{UID};
    use sui::string::String;
    use sui::signer::Signer;

    /// Estructura del Token
    public struct Token has store, key {
        id: UID,
        name: String,
        symbol: String,
        decimals: u8,
        total_supply: u64,
        creator: address,
    }

    /// Crear un nuevo token
    public entry fun create_token(
        sender: &Signer,
        name: String,
        symbol: String,
        decimals: u8,
        initial_supply: u64,
        ctx: &mut TxContext,
    ) {
        // Asegúrate de que UID::new(ctx) es válido
        let uid = UID::new(ctx);
        let creator = Signer::address_of(sender);
        let token = Token {
            id: uid,
            name,
            symbol,
            decimals,
            total_supply: initial_supply,
            creator,
        };
        // Asegúrate de que transfer::transfer es válido
        transfer::transfer(token, creator);
    }
}
