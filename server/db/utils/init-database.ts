import { User } from '../model/user.model';
import { Card } from '../model/card.model';
import { usersData } from './usersData';
import { cardsData } from './cardsData';
import chalk from 'chalk';

export async function initDatabase() {
    console.log(chalk.bgGreen('Creating initial data...'));
    try {
    await User.deleteMany();
    await Card.deleteMany();
    await User.insertMany(usersData);
    const businessUser = await User.findOne({isBusiness: true});
    const cards = cardsData;
    if (businessUser) {
        cards.forEach((card) => {
            card.user_id = businessUser._id.toString();
        });
    }
    await Card.insertMany(cards);
    console.log(chalk.bgGreen('Initial Data was created successfully!'));
    } catch (e) {
        console.log('DB initialization failed with error: ' + e);
    }
}
