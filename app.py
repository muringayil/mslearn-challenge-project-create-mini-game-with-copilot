"""
Rock-Paper-Scissors: Story Mode

Battle through stages against themed opponents:
1. Fire Master (Aggressive, favors 'rock')
2. Shadow Ninja (Tricky, favors 'scissors')
3. Robot Overlord (Calculating, random but sometimes uses special moves)

Bosses have special patterns or abilities.
Unlock achievements/cosmetics along the way.
"""

import random
import time

def get_computer_choice(opponent, round_num):
	# Boss patterns
	if opponent == "Fire Master":
		# Favors rock
		return random.choices(["rock", "paper", "scissors"], weights=[0.6, 0.2, 0.2])[0]
	elif opponent == "Shadow Ninja":
		# Favors scissors
		return random.choices(["rock", "paper", "scissors"], weights=[0.2, 0.2, 0.6])[0]
	elif opponent == "Robot Overlord":
		# Sometimes uses special move: always wins
		if round_num % 5 == 0:
			# Special move: always beats player
			return None  # Will be handled in main
		return random.choice(["rock", "paper", "scissors"])
	else:
		return random.choice(["rock", "paper", "scissors"])

def get_player_choice():
	while True:
		choice = input("Enter rock, paper, or scissors: ").strip().lower()
		if choice in ["rock", "paper", "scissors"]:
			return choice
		print("Invalid option. Please choose rock, paper, or scissors.")

def determine_winner(player, computer):
	if computer is None:
		# Robot Overlord special move
		return "lose"
	if player == computer:
		return "tie"
	elif (
		(player == "rock" and computer == "scissors") or
		(player == "scissors" and computer == "paper") or
		(player == "paper" and computer == "rock")
	):
		return "win"
	else:
		return "lose"

def main():
	print("Welcome, hero! Your quest: Defeat three legendary opponents in Rock-Paper-Scissors battles.")
	player_name = input("Enter your name: ").strip().title()
	stages = [
		{"name": "Fire Master", "desc": "A fierce opponent who loves rock!"},
		{"name": "Shadow Ninja", "desc": "A sneaky rival who favors scissors."},
		{"name": "Robot Overlord", "desc": "A calculating machine with a secret weapon."}
	]
	achievements = []
	cosmetics = []
	total_score = 0
	for stage_num, boss in enumerate(stages, 1):
		print(f"\nStage {stage_num}: {boss['name']} - {boss['desc']}")
		boss_score = 0
		player_score = 0
		for round_num in range(1, 4):
			print(f"\nRound {round_num}!")
			player = get_player_choice()
			print("...Battling...")
			time.sleep(1)
			computer = get_computer_choice(boss['name'], round_num)
			if computer is None:
				# Robot Overlord special move
				print("Robot Overlord uses 'Omega Algorithm'!")
				computer_choice = "(special move)"
			else:
				computer_choice = computer
			print(f"{boss['name']} chose: {computer_choice}")
			result = determine_winner(player, computer)
			if result == "win":
				print("You win this round!")
				player_score += 1
			elif result == "lose":
				print("You lose this round.")
				boss_score += 1
			else:
				print("It's a tie.")
			# Achievements
			if result == "win" and boss['name'] == "Fire Master" and player == "paper":
				achievements.append("Extinguished the Fire Master with paper!")
			if result == "win" and boss['name'] == "Shadow Ninja" and player == "rock":
				achievements.append("Crushed the Shadow Ninja with rock!")
			if result == "win" and boss['name'] == "Robot Overlord" and player == "scissors":
				achievements.append("Outsmarted the Robot Overlord with scissors!")
		print(f"\nStage result: {player_name} {player_score} - {boss['name']} {boss_score}")
		if player_score > boss_score:
			print(f"Victory! You defeated {boss['name']}.")
			total_score += 1
			cosmetics.append(f"{boss['name']} Trophy")
		else:
			print(f"Defeat... {boss['name']} wins this stage.")
	print("\n--- Quest Complete ---")
	print(f"{player_name}, you defeated {total_score} out of 3 bosses.")
	if achievements:
		print("\nAchievements unlocked:")
		for a in achievements:
			print(f"- {a}")
	if cosmetics:
		print("\nCosmetics unlocked:")
		for c in cosmetics:
			print(f"- {c}")
	print("\nThanks for playing!")

if __name__ == "__main__":
	main()