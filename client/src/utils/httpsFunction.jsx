import axios from "axios";

export const saveMove = async (move) => {
    try {
      const response = await axios.post(
        `https://localhost:3000/game/save_move`, {
        game_id: move.get('game_id'),
        move_number: move.get('move_number'),
        placed_symbol: move.get('placed_symbol'),
      });
      return response;
    } catch (error) {
      console.log(error);
    }
};