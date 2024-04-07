//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.44;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.44] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.44: April 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x3f7c0c=_0x36c0;(function(_0xd36ec8,_0x2beb7b){const _0x3ae745=_0x36c0,_0x48b6e7=_0xd36ec8();while(!![]){try{const _0x5beb7d=-parseInt(_0x3ae745(0x4dd))/0x1+parseInt(_0x3ae745(0x3c1))/0x2+parseInt(_0x3ae745(0x47e))/0x3+parseInt(_0x3ae745(0x2e5))/0x4+-parseInt(_0x3ae745(0x2b4))/0x5+-parseInt(_0x3ae745(0x341))/0x6*(-parseInt(_0x3ae745(0x411))/0x7)+parseInt(_0x3ae745(0x34b))/0x8;if(_0x5beb7d===_0x2beb7b)break;else _0x48b6e7['push'](_0x48b6e7['shift']());}catch(_0x21b918){_0x48b6e7['push'](_0x48b6e7['shift']());}}}(_0x37e8,0x39bba));function _0x36c0(_0xd3dab1,_0xdd3586){const _0x37e8bd=_0x37e8();return _0x36c0=function(_0x36c0b8,_0x2ce46e){_0x36c0b8=_0x36c0b8-0x1ab;let _0x48488a=_0x37e8bd[_0x36c0b8];return _0x48488a;},_0x36c0(_0xd3dab1,_0xdd3586);}function _0x37e8(){const _0x3890e7=['RefreshCacheSwitch','value','Game_Actor_learnSkill','_costSettings','stateData','isStateRemoved','DataFontSize','<actor-%1>','Game_Unit_isAllDead','hpDamage','clearAllStateOrigins','add','ytenl','push','yocUE','iLtKX','Window_SkillList_includes','_categoryWindow','skill','decreaseBuff','makeSuccess','action','sBfOX','innerWidth','isStateCategoryAffected','commandNameWindowCenter','ColorPositive','UBcGs','_actor','isStateAddable','isBuffOrDebuffAffected','rKfim','removeStatesAuto','AutoAddState','increaseBuff','setItem','CheckVisibleBattleNotetags','_stateRetainType','drawActorStateData','NPPvZ','384009ULzAYh','note','stateTpSlipDamageJS','parse','getColor','maxItems','placeExactGauge','nhfeI','categories','createSkillCostText','mainAreaHeight','lyCpY','addChild','checkSkillConditionsSwitchNotetags','_result','VisuMZ_1_ItemsEquipsCore','sdPPd','states','Scene_Skill_helpWindowRect','ScyCY','HjNfn','_stored_buffColor','meetsPassiveStateGlobalConditionJS','meetsStateCondition','ShowData','labelFontFace','isSkillCostShown','IconStypeMagic','status','ColorNeutral','checkSkillTypeMatch','commandName','VisuMZ_0_CoreEngine','dAzSS','log','Class-%1-%2','return\x200','checkCacheKey','Costs','EwwpF','buffLength','labelColor','isSkillHidden','MhgXD','cFavZ','index','YhamW','removeStatesByCategoryAll','addDebuffTurns','qLrkx','isAllDead','GTBLI','wBHwV','nVMLk','ecHTv','commandStyle','getSkillTypes','valueFontFace','skillEnableJS','getClassIdWithName','Game_Battler_onBattleEnd','shift','skillTypes','getCurrentTroopUniqueID','greater','%1%','changePaintOpacity','stateExpireJS','StateTurnsEnemyChangeBy','gaugeRate','onAddStateCustomJS','Scene_Skill_createItemWindow','meetsSkillConditionsEnableJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','wxQne','isBottomHelpMode','_stateTurns','StateTurnsActorChangeBy','currentMaxValueSkillsStatesCore','alterSkillName','CheckIncompatibleStates','changeTextColor','resetFontSettings','onEraseBuffGlobalJS','MPlve','helpWindowRect','adjustItemWidthByShopStatus','SKZIh','KpZyS','<enemy-%1>','hZlOI','ilAQq','allowCreateShopStatusWindow','shopStatusWindowRect','clearStateRetainType','height','FeLEd','ARRAYFUNC','Game_Switches_onChange','indexOf','drawExtendedSkillsStatesCoreStatus','passiveStateObjects','gradientFillRect','totalStateCategory','Game_Variables_onChange','meetsSkillConditionsGlobalJS','outlineColor','number','stateMpSlipHealJS','opacity','onExpireStateCustomJS','SkillEnemyPaySkillCost','constructor','createKeyJS','WTYsc','useDigitGrouping','onAddStateMakeCustomSlipValues','isSkillTypeMatchForUse','success','_statusWindow','canUse','applyItemUserEffect','addBuffTurns','uiMenuStyle','drawTextEx','States','removeBuff','gainHp','members','mainFontFace','actions','ncJMH','Game_Battler_isStateAddable','_tempActor','removeState','dtPQN','untitled','menuActor','CmdTextAlign','ESQyM','_cache_getPassiveStateConditionSwitchData','statusWindowRectSkillsStatesCore','FALXV','%1\x20%2\x20%3','gJCqd','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','GNdyy','restriction','ShowShopStatus','wmGQM','stateCategoriesResisted','recalculateSlipDamageJS','NGlzY','VisuMZ_1_ElementStatusCore','retrieveStateColor','ceil','SkillsStatesCore','toUpperCase','EnemyIndex','PayJS','changeOutlineColor','boxWidth','currentMaxValue','onAddStateJS','icon','fZYZN','UgDvs','skillId','onEraseStateGlobalJS','getStateOriginByKey','Sprite_StateIcon_loadBitmap','onEraseStateCustomJS','forgetSkill','DONAv','user','FmbpT','Sprite_Gauge_currentMaxValue','redrawSkillsStatesCore','omEmv','skills','StateTurnsEnemyChangeTo','drawIcon','getStateOrigin','NnSip','gainSilentTp','mainAreaTop','MaxTurns','createShopStatusWindow','createAllSkillCostText','addPassiveStatesByPluginParameters','stateAddJS','oxKtJ','applySkillsStatesCoreEffects','none','auto','buffTurns','Game_BattlerBase_overwriteBuffTurns','TextJS','addStateTurns','onEraseStateJS','Game_BattlerBase_eraseBuff','LUK','#%1','match','Scene_Skill_skillTypeWindowRect','helpAreaHeight','onExpireDebuffGlobalJS','onBattleEnd','wpfDT','updatedLayoutStyle','fhvOV','textColor','ARRAYNUM','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_stored_state-%1-color','drawActorBuffTurns','Game_Actor_forgetSkill','commandNameWindowDrawText','AriTD','isStateAffected','iconWidth','isPartyAllAffectedByGroupDefeatStates','ParseClassIDs','addState','addPassiveStatesByNotetag','Skills','calcWindowHeight','TurnOffsetY','jTxvm','DEF','getStypeIdWithName','currentClass','KBEKn','clamp','uiInputPosition','ePkSw','onRemoveState','iconHeight','ValueOutlineWidth','idZFC','Game_BattlerBase_meetsSkillConditions','CheckVisibleSkillNotetags','process_VisuMZ_SkillsStatesCore_Notetags','UNyts','clearStateDisplay','_skillTypeWindow','Game_Battler_regenerateAll','multiclasses','ZlYgM','makeCommandList','rnvpc','\x5cI[%1]%2','checkShowHideJS','resetTextColor','setStateRetainType','EnableLayout','XsHEO','Sprite_StateIcon_updateFrame','isStateExpired','onEraseBuff','_states','updateStatesActionEnd','begEh','valueOutlineWidth','passiveStates','CanPayJS','applyStateTurnManipulationEffects','qiBBd','_currentActor','VisuMZ_2_ClassChangeSystem','lineHeight','setActor','Game_BattlerBase_initMembers','iconIndex','maxSlipDamage','LOzZG','hasState','totalStateCategoryAffected','Kjerz','EyZzk','ghwyj','aliveMembers','itemTextAlign','Game_BattlerBase_resetStateCounts','Scene_Skill_statusWindowRect','Game_BattlerBase_eraseState','drawItemStyleIconText','process_VisuMZ_SkillsStatesCore_Skill_Notetags','multiClass','remove','normalColor','convertGaugeTypeSkillsStatesCore','updateTurnDisplaySprite','isBuffExpired','keys','Game_BattlerBase_refresh','_stypeIDs','lQXpM','iPfLo','MDF','xNqwF','OtMkq','textSizeEx','_shopStatusWindow','Parse_Notetags_Skill_Cost','SkillMenuStatusRect','QXlaS','helpAreaTop','DataOffsetX','HcjbX','Game_BattlerBase_clearStates','stateId','ARxKt','qjHvJ','isDebuffAffected','wTQKi','isBuffPrevented','hmLaU','itemLineRect','_battler','Game_Troop_setup','itemWindowRectSkillsStatesCore','StackDebuffMax','statusWindowRect','sort','Weapon-%1-%2','aLqKK','39880xRPPmR','isSceneBattle','_stypeId','mainCommandWidth','HBteN','learnSkill','updateVisibility','PxMqn','isUseModernControls','Enemy','Parse_Notetags_State_Category','CeEtK','iwjui','oYxWU','makeCommandName','ColorBuff','Game_Action_applyItemUserEffect','_checkingPassiveStates','ParseSkillNotetags','stateTurns','loFNW','AGI','slipTp','UxzwZ','numberFontFace','JTiLE','setDebuffTurns','stateMpSlipDamageJS','ePUhu','getColorDataFromPluginParameters','AfbHe','slipHp','PzCuN','priority','prepareResetStateCounts','uPePt','HnQtr','isPassiveStateStackable','tMree','getStateRetainType','ListWindowCols','TurnFontSize','statesByCategory','initMembersSkillsStatesCore','eraseState','paramBuffRate','stepsForTurn','ReapplyRules','vEIUN','1052100glDSVW','recoverAll','_skills','bRRwB','reset','drawActorIcons','_animationIndex','fontSize','endAction','addPassiveStatesFromOtherPlugins','_cache','Window_SkillStatus_refresh','skillVisibleJS','clear','meetsSkillConditions','getSkillIdWithName','OEcZq','BattleManager_endAction','setupSkillsStatesCore','onExpireBuff','addCommand','Game_Action_testApply','slipMp','registerCommand','ShowJS','hasSkill','Sprite_Gauge_setup','gaugeColor1','Item-%1-%2','round','cDFqJ','overwriteBuffTurns','KWlRG','rrQwN','mpDamage','bMhRc','ignore','ifzMx','contents','_stored_debuffColor','setBackgroundType','isLearnedSkill','UxuWz','isRightInputMode','checkShowHideNotetags','stateColor','csQaH','LabelFontMainType','nRfBQ','_stateMaxTurns','LKVsL','max','<troop-%1>','GroupDigits','PresetLabelGaugeColor','JFSaX','stateEraseJS','_stateOrigin','LsGec','applyStateCategoryRemovalEffects','Window_StatusBase_drawActorIcons','jkBTz','Sprite_Gauge_gaugeRate','Wnzym','isAlive','actor','buffIconIndex','iPOKu','enemyId','anchor','pNYYe','dUDVx','removeStatesByCategory','dgLPK','itemAt','onRegenerateCustomStateDamageOverTime','ARRAYEVAL','getPassiveStatesFromObj','bLpHT','_buffTurns','anySwitchOff','XsmgF','onExpireState','uPWgH','name','DisplayedParams','colSpacing','_passiveStateResults','StateID','convertTargetToStateOriginKey','fbuWh','PHjxd','364254KOHWMX','yrvGS','CoreEngine','_classIDs','getStateData','statusWidth','ZdJwm','GWtre','placeGauge','iconText','1700376KxMCiW','stypeId','split','stateHpSlipHealJS','Gauge','ZXJWM','getPassiveStateConditionClassesData','stateTpSlipHealJS','onAddDebuffGlobalJS','MnuKX','_stateData','length','updateCommandNameWindow','xZrFG','setup','RsZlJ','getCurrentStateOriginKey','cqQaV','Parse_Notetags_Skill_JS','onChange','createItemWindow','getPassiveStateConditionSwitchData','OLORI','LUodY','UQqwv','SkillID','_checkingVisuMzPassiveStateObjects','Game_BattlerBase_isStateResist','clearStateOrigin','deadMembers','ZyPYx','clearStatesWithStateRetain','NUM','drawItemStyleIcon','inBattle','groupDefeat','bitmap','PmDuQ','onAddStateGlobalJS','createCommandNameWindow','hasStateCategory','ElSTE','QWUZi','Game_BattlerBase_states','gaugeColor2','addBuff','enemy','uiHelpPosition','refresh','ActionEndUpdate','GaugeDrawJS','Game_BattlerBase_die','resetStateCounts','LabelOutlineSolid','SkillConditionJS','isStateRestrict','commandStyleCheck','mnTEh','onAddBuff','shopStatusWidth','traitsSet','ILXpf','rARNe','equips','wNAMd','JLxwj','recover\x20all','currentDisplayedValue','STR','concat','isMaxDebuffAffected','lAcIp','KNjMN','process_VisuMZ_SkillsStatesCore_State_Notetags','setStatusWindow','applyDebuffTurnManipulationEffects','NqezF','JNRvg','Parse_Notetags_State_ApplyRemoveLeaveJS','hmzjf','convertPassiveStates','allSwitchOn','Parse_Notetags_State_SlipEffectJS','_scene','veNmH','EVAL','QrOBN','PWjJN','Game_Battler_addState','test','allBattleMembers','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','gaugeLineHeight','Armor-%1-%2','isPlaytest','canPaySkillCost','WMrXB','die','setBuffTurns','replace','sSZvs','item','estFt','zKCBl','_stateDisplay','callUpdateHelp','Game_Battler_addDebuff','prototype','getStateDisplay','redraw','Buffs','_currentTroopUniqueID','PassiveStates','JdVvX','clearStateData','anySwitchOn','FUNC','setPassiveStateSlipDamageJS','53670hvEjHC','yRlgZ','sVfYH','rgba(0,\x200,\x200,\x200)','onAddBuffJS','PassiveConditionJS','cuDxZ','drawActorStateTurns','drawFullGauge','drawText','BzYqB','JRrlr','toLowerCase','passiveStateIDs','meetsPassiveStateConditionClasses','pDqMC','makeResistedStateCategories','valueFontSize','MAXHP','autoRemovalTiming','FfgnQ','StateTurnsActorChangeTo','dgjLR','eVvCV','removeBuffsAuto','call','actorId','buttonAssistText1','makeAdditionalSkillCostText','ConvertParams','ShowTurns','ParseAllNotetags','allSwitchOff','MAT','SIgRN','regenerateAll','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','makeCurrentTroopUniqueID','onDatabaseLoaded','riWqu','floor','xkbvC','checkSkillConditionsNotetags','drawParamText','IconStypeNorm','stateHpSlipDamageJS','getStateIdWithName','isSkillUsableForAutoBattle','updateHelp','IvMEs','onExpireDebuffJS','width','_endingBattle','setStateTurns','onEraseBuffJS','FOMPA','GxBXH','RefreshCacheVar','mpCost','clearStates','eraseBuff','JkRKr','itemWindowRect','addDebuff','Game_BattlerBase_buffIconIndex','Actor','isActor','ValueFontMainType','Name','Scene_Boot_onDatabaseLoaded','currentValue','WDAHK','_stateIDs','onEraseDebuffGlobalJS','Game_BattlerBase_skillTpCost','_itemWindow','rgba(0,\x200,\x200,\x201)','shopStatusWindowRectSkillsStatesCore','IRqLv','_subject','7qYWtex','onExpireDebuff','statePassiveConditionJS','GaugeMaxJS','CheckVisibleSwitchNotetags','updateFrame','stateMaximumTurns','_skillIDs','addPassiveStatesTraitSets','zWQRC','EiIbh','maxCols','Game_BattlerBase_skillMpCost','tGMQn','cImkP','fontBold','pihRD','loadBitmap','drawExtendedParameter','createTurnDisplaySprite','onExpireBuffGlobalJS','skillMpCost','commandNameWindowDrawBackground','EmliQ','setStateDisplay','drawActorBuffRates','rHMuV','Scene_Skill_itemWindowRect','addWindow','nrnkD','adjustSkillCost','State-%1-%2','mainFontSize','initialize','initMembers','Sprite_Gauge_redraw','JaQup','damage','CalcJS','testApply','_stateSteps','filter','Game_BattlerBase_traitsSet','YMNPv','parameters','createPassiveStatesCache','isStateCategoryResisted','SkillActorPaySkillCost','isUseSkillsStatesCoreUpdatedLayout','meetsPassiveStateConditionJS','PVRxm','DpRxo','skillTypeWindowRect','canClearState','Sprite_Gauge_currentValue','kJdcL','_cache_getPassiveStatesFromObj','text','_turnDisplaySprite','Window_SkillType_initialize','ApUDk','_commandNameWindow','ZgmxH','testSkillStatesCoreNotetags','EhoPp','VvMdD','Window_SkillList_updateHelp','Game_Unit_deadMembers','MAXMP','ATK','Sprite_Gauge_initMembers','frameCount','skillCostSeparator','rNsns','hide','Window_SkillList_setActor','vuefg','CmdWidth','dEESg','MitgJ','skillTpCost','helpWindowRectSkillsStatesCore','onEraseDebuff','QojJF','tpCost','exit','LayoutStyle','pUkvQ','nlupC','HcbJJ','isGroupDefeatStateAffected','_checkingTraitsSetSkillsStatesCore','ziOVH','Window_SkillList_drawItem','ALL','qxlst','MatchLabelGaugeColor','gcvzo','DvTVJ','drawItem','buff','MultiplierJS','StackBuffMax','map','_cache_getPassiveStateConditionClassesData','description','onExpireStateGlobalJS','drawActorIconsAllTurnCounters','drawSkillCost','196029UlHRaA','heal','onAddState','NEGATIVE','right','isStateResist','Game_Actor_skillTypes','TurnOffsetX','includes','paySkillCost','_tempBattler','RiPFd','gainMp','ValueOutlineSolid','getCurrentStateActiveUser','onAddDebuffJS','center','CmdStyle','ActorIDs','LydaD','yeENa','ciSHy','labelOutlineWidth','onAddDebuff','Game_BattlerBase_increaseBuff','format','bZyHE','setStateData','death','_buffs','addPassiveStates','magicSkills','_colorCache','regenerateAllSkillsStatesCore','POSITIVE','currentValueSkillsStatesCore','STRUCT','ARRAYSTR','onAddBuffGlobalJS','isBuffAffected','ParseStateNotetags','Settings','fontFace','rpZXJ','buffColor','ColorNegative','setStateOrigin','Parse_Notetags_State_PassiveJS','<member-%1>','debuffColor','Param','trim','Game_BattlerBase_decreaseBuff','Turns','BxPNy'];_0x37e8=function(){return _0x3890e7;};return _0x37e8();}var label=_0x3f7c0c(0x209),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3f7c0c(0x43a)](function(_0x4ef80d){const _0x43d798=_0x3f7c0c;return _0x4ef80d[_0x43d798(0x4f9)]&&_0x4ef80d[_0x43d798(0x47a)][_0x43d798(0x486)]('['+label+']');})[0x0];VisuMZ[label][_0x3f7c0c(0x4a7)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x3f7c0c(0x3de)]=function(_0x514bb5,_0x5eaa88){const _0x5195a8=_0x3f7c0c;for(const _0x46b7cf in _0x5eaa88){if(_0x46b7cf[_0x5195a8(0x238)](/(.*):(.*)/i)){const _0xd3ba07=String(RegExp['$1']),_0x412afe=String(RegExp['$2'])['toUpperCase']()[_0x5195a8(0x4b1)]();let _0x4d66c7,_0x1f0ae9,_0x1687f9;switch(_0x412afe){case _0x5195a8(0x36b):_0x4d66c7=_0x5eaa88[_0x46b7cf]!==''?Number(_0x5eaa88[_0x46b7cf]):0x0;break;case _0x5195a8(0x241):_0x1f0ae9=_0x5eaa88[_0x46b7cf]!==''?JSON[_0x5195a8(0x4e0)](_0x5eaa88[_0x46b7cf]):[],_0x4d66c7=_0x1f0ae9[_0x5195a8(0x478)](_0x12388d=>Number(_0x12388d));break;case _0x5195a8(0x3a0):_0x4d66c7=_0x5eaa88[_0x46b7cf]!==''?eval(_0x5eaa88[_0x46b7cf]):null;break;case _0x5195a8(0x331):_0x1f0ae9=_0x5eaa88[_0x46b7cf]!==''?JSON[_0x5195a8(0x4e0)](_0x5eaa88[_0x46b7cf]):[],_0x4d66c7=_0x1f0ae9['map'](_0x599047=>eval(_0x599047));break;case'JSON':_0x4d66c7=_0x5eaa88[_0x46b7cf]!==''?JSON[_0x5195a8(0x4e0)](_0x5eaa88[_0x46b7cf]):'';break;case'ARRAYJSON':_0x1f0ae9=_0x5eaa88[_0x46b7cf]!==''?JSON[_0x5195a8(0x4e0)](_0x5eaa88[_0x46b7cf]):[],_0x4d66c7=_0x1f0ae9[_0x5195a8(0x478)](_0x54d795=>JSON[_0x5195a8(0x4e0)](_0x54d795));break;case _0x5195a8(0x3bf):_0x4d66c7=_0x5eaa88[_0x46b7cf]!==''?new Function(JSON[_0x5195a8(0x4e0)](_0x5eaa88[_0x46b7cf])):new Function(_0x5195a8(0x501));break;case _0x5195a8(0x1ce):_0x1f0ae9=_0x5eaa88[_0x46b7cf]!==''?JSON['parse'](_0x5eaa88[_0x46b7cf]):[],_0x4d66c7=_0x1f0ae9[_0x5195a8(0x478)](_0x22dd3e=>new Function(JSON[_0x5195a8(0x4e0)](_0x22dd3e)));break;case _0x5195a8(0x38f):_0x4d66c7=_0x5eaa88[_0x46b7cf]!==''?String(_0x5eaa88[_0x46b7cf]):'';break;case _0x5195a8(0x4a3):_0x1f0ae9=_0x5eaa88[_0x46b7cf]!==''?JSON[_0x5195a8(0x4e0)](_0x5eaa88[_0x46b7cf]):[],_0x4d66c7=_0x1f0ae9[_0x5195a8(0x478)](_0x1df2b6=>String(_0x1df2b6));break;case _0x5195a8(0x4a2):_0x1687f9=_0x5eaa88[_0x46b7cf]!==''?JSON[_0x5195a8(0x4e0)](_0x5eaa88[_0x46b7cf]):{},_0x514bb5[_0xd3ba07]={},VisuMZ[_0x5195a8(0x3de)](_0x514bb5[_0xd3ba07],_0x1687f9);continue;case'ARRAYSTRUCT':_0x1f0ae9=_0x5eaa88[_0x46b7cf]!==''?JSON['parse'](_0x5eaa88[_0x46b7cf]):[],_0x4d66c7=_0x1f0ae9[_0x5195a8(0x478)](_0x2a7987=>VisuMZ[_0x5195a8(0x3de)]({},JSON[_0x5195a8(0x4e0)](_0x2a7987)));break;default:continue;}_0x514bb5[_0xd3ba07]=_0x4d66c7;}}return _0x514bb5;},(_0x461256=>{const _0x280ef7=_0x3f7c0c,_0x13d260=_0x461256['name'];for(const _0x7ce52f of dependencies){if(_0x280ef7(0x3af)!==_0x280ef7(0x3af))return _0x298bc2[_0x280ef7(0x209)][_0x280ef7(0x4ef)][_0x280ef7(0x3da)](this);else{if(!Imported[_0x7ce52f]){alert(_0x280ef7(0x1fe)[_0x280ef7(0x497)](_0x13d260,_0x7ce52f)),SceneManager['exit']();break;}}}const _0x2a6019=_0x461256[_0x280ef7(0x47a)];if(_0x2a6019[_0x280ef7(0x238)](/\[Version[ ](.*?)\]/i)){if(_0x280ef7(0x3cb)!==_0x280ef7(0x448)){const _0x4d8f99=Number(RegExp['$1']);if(_0x4d8f99!==VisuMZ[label]['version']){if(_0x280ef7(0x1c8)===_0x280ef7(0x1c8))alert(_0x280ef7(0x3e5)[_0x280ef7(0x497)](_0x13d260,_0x4d8f99)),SceneManager[_0x280ef7(0x466)]();else return this[_0x280ef7(0x240)](_0x3a4831(_0x2e204c));}}else return _0x5a22d5[_0x280ef7(0x410)];}if(_0x2a6019['match'](/\[Tier[ ](\d+)\]/i)){const _0x27007d=Number(RegExp['$1']);_0x27007d<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x280ef7(0x497)](_0x13d260,_0x27007d,tier)),SceneManager[_0x280ef7(0x466)]()):tier=Math['max'](_0x27007d,tier);}VisuMZ[_0x280ef7(0x3de)](VisuMZ[label]['Settings'],_0x461256[_0x280ef7(0x43d)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x3f7c0c(0x339)],_0x3f7c0c(0x440),_0x1d8969=>{const _0x5f328f=_0x3f7c0c;VisuMZ[_0x5f328f(0x3de)](_0x1d8969,_0x1d8969);const _0x3d469b=_0x1d8969['ActorIDs']||[],_0x13d8bb=Number(_0x1d8969['SkillID']),_0x5e540e=$dataSkills[_0x13d8bb];if(!_0x5e540e)return;for(const _0x21a968 of _0x3d469b){const _0x100f56=$gameActors[_0x5f328f(0x326)](_0x21a968);if(!_0x100f56)continue;_0x100f56[_0x5f328f(0x487)](_0x5e540e);}}),PluginManager[_0x3f7c0c(0x2fc)](pluginData['name'],_0x3f7c0c(0x1dc),_0x23f52d=>{const _0x57da49=_0x3f7c0c;VisuMZ[_0x57da49(0x3de)](_0x23f52d,_0x23f52d);const _0x212522=_0x23f52d[_0x57da49(0x20b)]||[],_0x44f6a3=Number(_0x23f52d[_0x57da49(0x364)]),_0x5c53d=$dataSkills[_0x44f6a3];if(!_0x5c53d)return;for(const _0x18ffc5 of _0x212522){const _0x8b6978=$gameTroop[_0x57da49(0x1ed)]()[_0x18ffc5];if(!_0x8b6978)continue;_0x8b6978[_0x57da49(0x487)](_0x5c53d);}}),PluginManager[_0x3f7c0c(0x2fc)](pluginData[_0x3f7c0c(0x339)],_0x3f7c0c(0x1ba),_0x23381d=>{const _0x2d133f=_0x3f7c0c;VisuMZ[_0x2d133f(0x3de)](_0x23381d,_0x23381d);const _0x50221f=_0x23381d[_0x2d133f(0x490)]||[],_0x4a82dd=Number(_0x23381d[_0x2d133f(0x33d)]),_0x5620f8=Number(_0x23381d[_0x2d133f(0x4b3)]),_0xa14eae=_0x23381d['AutoAddState'];for(const _0x315dd1 of _0x50221f){const _0x1be522=$gameActors[_0x2d133f(0x326)](_0x315dd1);if(!_0x1be522)continue;_0xa14eae&&!_0x1be522['isStateAffected'](_0x4a82dd)?(_0x1be522['addState'](_0x4a82dd),_0x1be522[_0x2d133f(0x3f6)](_0x4a82dd,_0x5620f8)):_0x2d133f(0x470)===_0x2d133f(0x470)?_0x1be522[_0x2d133f(0x233)](_0x4a82dd,_0x5620f8):_0x1c7426[_0x2d133f(0x39c)]=_0x2b10cf(_0x880579['$1'])['split'](',')['map'](_0xb9ed45=>_0x35c89a(_0xb9ed45));}}),PluginManager['registerCommand'](pluginData[_0x3f7c0c(0x339)],_0x3f7c0c(0x3d6),_0x4ffc86=>{const _0x4ead91=_0x3f7c0c;VisuMZ[_0x4ead91(0x3de)](_0x4ffc86,_0x4ffc86);const _0x4c1212=_0x4ffc86[_0x4ead91(0x490)]||[],_0x43ed2a=Number(_0x4ffc86[_0x4ead91(0x33d)]),_0xcdf094=Math[_0x4ead91(0x318)](Number(_0x4ffc86['Turns']),0x0),_0xb987ba=_0x4ffc86['AutoAddState'];for(const _0x5594ef of _0x4c1212){const _0x2db9aa=$gameActors['actor'](_0x5594ef);if(!_0x2db9aa)continue;_0xb987ba&&!_0x2db9aa[_0x4ead91(0x248)](_0x43ed2a)&&_0x2db9aa[_0x4ead91(0x24c)](_0x43ed2a),_0x2db9aa[_0x4ead91(0x3f6)](_0x43ed2a,_0xcdf094);}}),PluginManager[_0x3f7c0c(0x2fc)](pluginData[_0x3f7c0c(0x339)],_0x3f7c0c(0x1b1),_0x309aca=>{const _0x22f97d=_0x3f7c0c;if(!$gameParty['inBattle']())return;VisuMZ[_0x22f97d(0x3de)](_0x309aca,_0x309aca);const _0x46e09d=_0x309aca[_0x22f97d(0x20b)]||[],_0x56492a=Number(_0x309aca['StateID']),_0x584779=Number(_0x309aca['Turns']),_0x11b171=_0x309aca[_0x22f97d(0x4d6)];for(const _0x47c601 of _0x46e09d){const _0x4f4ac2=$gameTroop[_0x22f97d(0x1ed)]()[_0x47c601];if(!_0x4f4ac2)continue;if(_0x11b171&&!_0x4f4ac2[_0x22f97d(0x248)](_0x56492a))_0x22f97d(0x32e)!==_0x22f97d(0x32e)?_0x47c0fd=_0x5dc5a1[_0x22f97d(0x318)](_0x23ae1e,_0x16a748):(_0x4f4ac2[_0x22f97d(0x24c)](_0x56492a),_0x4f4ac2[_0x22f97d(0x3f6)](_0x56492a,_0x584779));else{if(_0x22f97d(0x4cb)!==_0x22f97d(0x4cb)){if(_0x5ae524)_0x37ab97[_0x22f97d(0x37b)]();}else _0x4f4ac2[_0x22f97d(0x233)](_0x56492a,_0x584779);}}}),PluginManager[_0x3f7c0c(0x2fc)](pluginData[_0x3f7c0c(0x339)],_0x3f7c0c(0x221),_0xb8725=>{const _0x42d5d0=_0x3f7c0c;if(!$gameParty['inBattle']())return;VisuMZ[_0x42d5d0(0x3de)](_0xb8725,_0xb8725);const _0x13a988=_0xb8725['EnemyIndex']||[],_0x2b43d8=Number(_0xb8725[_0x42d5d0(0x33d)]),_0x3ec27f=Math[_0x42d5d0(0x318)](Number(_0xb8725[_0x42d5d0(0x4b3)]),0x0),_0x5e9aaa=_0xb8725[_0x42d5d0(0x4d6)];for(const _0x37faca of _0x13a988){const _0x32424a=$gameTroop[_0x42d5d0(0x1ed)]()[_0x37faca];if(!_0x32424a)continue;_0x5e9aaa&&!_0x32424a[_0x42d5d0(0x248)](_0x2b43d8)&&_0x32424a['addState'](_0x2b43d8),_0x32424a[_0x42d5d0(0x3f6)](_0x2b43d8,_0x3ec27f);}}),VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x406)]=Scene_Boot[_0x3f7c0c(0x3b6)]['onDatabaseLoaded'],Scene_Boot[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3e7)]=function(){const _0x1138f6=_0x3f7c0c;VisuMZ[_0x1138f6(0x209)][_0x1138f6(0x406)][_0x1138f6(0x3da)](this),this[_0x1138f6(0x25f)](),VisuMZ[_0x1138f6(0x209)][_0x1138f6(0x1bd)]();},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x343010=_0x3f7c0c;if(VisuMZ[_0x343010(0x3e0)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x343010(0x394)]();},Scene_Boot[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x28c)]=function(){const _0x7201ca=_0x3f7c0c;for(const _0x2b3750 of $dataSkills){if(!_0x2b3750)continue;VisuMZ[_0x7201ca(0x209)][_0x7201ca(0x29d)](_0x2b3750),VisuMZ[_0x7201ca(0x209)][_0x7201ca(0x35d)](_0x2b3750);}},Scene_Boot[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x394)]=function(){const _0x45c3fc=_0x3f7c0c;for(const _0x283d4f of $dataStates){if(!_0x283d4f)continue;VisuMZ[_0x45c3fc(0x209)]['Parse_Notetags_State_Category'](_0x283d4f),VisuMZ[_0x45c3fc(0x209)][_0x45c3fc(0x4ad)](_0x283d4f),VisuMZ['SkillsStatesCore'][_0x45c3fc(0x39d)](_0x283d4f),VisuMZ[_0x45c3fc(0x209)][_0x45c3fc(0x399)](_0x283d4f);}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x2c6)]=VisuMZ[_0x3f7c0c(0x2c6)],VisuMZ[_0x3f7c0c(0x2c6)]=function(_0x45192c){const _0x347c90=_0x3f7c0c;VisuMZ['SkillsStatesCore']['ParseSkillNotetags'][_0x347c90(0x3da)](this,_0x45192c),VisuMZ[_0x347c90(0x209)][_0x347c90(0x29d)](_0x45192c),VisuMZ['SkillsStatesCore'][_0x347c90(0x35d)](_0x45192c);},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x4a6)]=VisuMZ[_0x3f7c0c(0x4a6)],VisuMZ[_0x3f7c0c(0x4a6)]=function(_0x1c101c){const _0x43e6dd=_0x3f7c0c;VisuMZ['SkillsStatesCore']['ParseStateNotetags'][_0x43e6dd(0x3da)](this,_0x1c101c),VisuMZ[_0x43e6dd(0x209)][_0x43e6dd(0x2be)](_0x1c101c),VisuMZ[_0x43e6dd(0x209)]['Parse_Notetags_State_PassiveJS'](_0x1c101c),VisuMZ[_0x43e6dd(0x209)][_0x43e6dd(0x39d)](_0x1c101c),VisuMZ[_0x43e6dd(0x209)][_0x43e6dd(0x399)](_0x1c101c);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x29d)]=function(_0x2ce164){const _0x2590d0=_0x3f7c0c,_0xa7d55d=_0x2ce164[_0x2590d0(0x4de)];_0xa7d55d[_0x2590d0(0x238)](/<MP COST:[ ](\d+)>/i)&&(_0x2ce164[_0x2590d0(0x3fb)]=Number(RegExp['$1']));if(_0xa7d55d[_0x2590d0(0x238)](/<TP COST:[ ](\d+)>/i)){if(_0x2590d0(0x2d8)===_0x2590d0(0x2d8))_0x2ce164[_0x2590d0(0x465)]=Number(RegExp['$1']);else{if(!_0x5adfe0[_0x2590d0(0x2fe)](_0x3abc2e))return!![];}}},VisuMZ[_0x3f7c0c(0x209)]['skillEnableJS']={},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x2f1)]={},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x35d)]=function(_0x4adb30){const _0x42baf4=_0x3f7c0c,_0xb6dee=_0x4adb30[_0x42baf4(0x4de)];if(_0xb6dee['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x2d6f89=String(RegExp['$1']),_0xe0f761=_0x42baf4(0x242)['format'](_0x2d6f89);VisuMZ[_0x42baf4(0x209)][_0x42baf4(0x517)][_0x4adb30['id']]=new Function(_0x42baf4(0x4c7),_0xe0f761);}if(_0xb6dee['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x1ba445=String(RegExp['$1']),_0x5771b8=_0x42baf4(0x1b6)['format'](_0x1ba445);VisuMZ['SkillsStatesCore']['skillVisibleJS'][_0x4adb30['id']]=new Function(_0x42baf4(0x4c7),_0x5771b8);}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x2be)]=function(_0x406bd5){const _0x3da533=_0x3f7c0c;_0x406bd5['categories']=[_0x3da533(0x46f),'ANY'];const _0x460908=_0x406bd5[_0x3da533(0x4de)],_0x2adb33=_0x460908[_0x3da533(0x238)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x2adb33){if(_0x3da533(0x285)!==_0x3da533(0x285)){if(!_0x30517c[_0x3da533(0x209)][_0x3da533(0x4a7)]['States']['ShowTurns'])return;if(!_0x433f3d['isStateAffected'](_0x4cda8a['id']))return;if(_0x5ceae4[_0x3da533(0x3d4)]===0x0)return;if(_0xe5399f[_0x3da533(0x4de)][_0x3da533(0x238)](/<HIDE STATE TURNS>/i))return;const _0x5eb717=_0x4d2bd2[_0x3da533(0x2c7)](_0x29129a['id']),_0x21aff4=_0x33e5ac[_0x3da533(0x249)],_0x305c4d=_0xd14ad3[_0x3da533(0x312)](_0x2a8582);this[_0x3da533(0x1be)](_0x305c4d),this['changeOutlineColor'](_0x3da533(0x40d)),this[_0x3da533(0x30b)]['fontBold']=!![],this[_0x3da533(0x30b)][_0x3da533(0x2ec)]=_0x3cb774['SkillsStatesCore']['Settings'][_0x3da533(0x1ea)][_0x3da533(0x2dd)],_0x1b72d4+=_0x12d8a8[_0x3da533(0x209)][_0x3da533(0x4a7)][_0x3da533(0x1ea)][_0x3da533(0x485)],_0x418ced+=_0x5902de[_0x3da533(0x209)]['Settings'][_0x3da533(0x1ea)]['TurnOffsetY'],this[_0x3da533(0x3ca)](_0x5eb717,_0x24cf61,_0x52e5f1,_0x21aff4,'right'),this[_0x3da533(0x30b)][_0x3da533(0x420)]=![],this[_0x3da533(0x1bf)]();}else for(const _0x4c4a87 of _0x2adb33){if(_0x3da533(0x2bb)!==_0x3da533(0x41f)){_0x4c4a87[_0x3da533(0x238)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x4a77e4=String(RegExp['$1'])[_0x3da533(0x20a)]()[_0x3da533(0x4b1)]()[_0x3da533(0x34d)](',');for(const _0x9a2cc8 of _0x4a77e4){_0x406bd5[_0x3da533(0x4e5)][_0x3da533(0x4c2)](_0x9a2cc8[_0x3da533(0x4b1)]());}}else for(let _0x96e11d=0x0;_0x96e11d<this[_0x3da533(0x505)]();_0x96e11d++){if(this[_0x3da533(0x292)](_0x96e11d)){const _0x1d5998=this['_buffs'][_0x96e11d];this[_0x3da533(0x1eb)](_0x96e11d);if(_0x1d5998>0x0)this[_0x3da533(0x2f8)](_0x96e11d);if(_0x1d5998<0x0)this['onExpireDebuff'](_0x96e11d);}}}}if(_0x460908[_0x3da533(0x238)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x3da533(0x1df)===_0x3da533(0x3ab))this['recalculateSlipDamageJS'](),_0x2d8b94[_0x3da533(0x209)]['Game_Battler_regenerateAll'][_0x3da533(0x3da)](this),this[_0x3da533(0x3c0)](),this[_0x3da533(0x49f)]();else{const _0x13375c=RegExp['$1']['split'](/[\r\n]+/);for(const _0x557246 of _0x13375c){_0x406bd5['categories'][_0x3da533(0x4c2)](_0x557246[_0x3da533(0x20a)]()['trim']());}}}_0x460908['match'](/<POSITIVE STATE>/i)&&_0x406bd5[_0x3da533(0x4e5)][_0x3da533(0x4c2)](_0x3da533(0x4a0));if(_0x460908[_0x3da533(0x238)](/<NEGATIVE STATE>/i)){if(_0x3da533(0x2aa)===_0x3da533(0x2aa))_0x406bd5[_0x3da533(0x4e5)][_0x3da533(0x4c2)](_0x3da533(0x481));else{if(_0x4d76a5[_0x3da533(0x3a9)]())_0x23c0e2[_0x3da533(0x4ff)](_0x3b4e12);}}},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x413)]={},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x4ad)]=function(_0x15a769){const _0x2e3cde=_0x3f7c0c,_0x88befa=_0x15a769[_0x2e3cde(0x4de)];if(_0x88befa['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x560c56=String(RegExp['$1']),_0x357938='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2e3cde(0x497)](_0x560c56);VisuMZ[_0x2e3cde(0x209)][_0x2e3cde(0x413)][_0x15a769['id']]=new Function('state',_0x357938);}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x3ee)]={},VisuMZ['SkillsStatesCore']['stateHpSlipHealJS']={},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x2cf)]={},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x1d9)]={},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x4df)]={},VisuMZ[_0x3f7c0c(0x209)]['stateTpSlipHealJS']={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS']=function(_0xb050d2){const _0x30f288=_0x3f7c0c,_0x25a76c=_0xb050d2[_0x30f288(0x4de)],_0x462a0d='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x25a76c[_0x30f288(0x238)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x1361d2=String(RegExp['$1']),_0x2aeda9=_0x462a0d[_0x30f288(0x497)](_0x1361d2,_0x30f288(0x436),-0x1,_0x30f288(0x2d3));VisuMZ['SkillsStatesCore'][_0x30f288(0x3ee)][_0xb050d2['id']]=new Function('stateId',_0x2aeda9);}else{if(_0x25a76c['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x264979=String(RegExp['$1']),_0x4f1403=_0x462a0d[_0x30f288(0x497)](_0x264979,_0x30f288(0x47f),0x1,_0x30f288(0x2d3));VisuMZ['SkillsStatesCore'][_0x30f288(0x34e)][_0xb050d2['id']]=new Function(_0x30f288(0x2a4),_0x4f1403);}}if(_0x25a76c['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if(_0x30f288(0x313)!==_0x30f288(0x313)){if(!_0x141581[_0x30f288(0x2fe)](_0x21eaa6))return![];}else{const _0x5166ad=String(RegExp['$1']),_0x493fab=_0x462a0d['format'](_0x5166ad,_0x30f288(0x436),-0x1,_0x30f288(0x2fb));VisuMZ['SkillsStatesCore'][_0x30f288(0x2cf)][_0xb050d2['id']]=new Function(_0x30f288(0x2a4),_0x493fab);}}else{if(_0x25a76c[_0x30f288(0x238)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x2322c3=String(RegExp['$1']),_0xc7fda7=_0x462a0d[_0x30f288(0x497)](_0x2322c3,_0x30f288(0x47f),0x1,_0x30f288(0x2fb));VisuMZ[_0x30f288(0x209)][_0x30f288(0x1d9)][_0xb050d2['id']]=new Function(_0x30f288(0x2a4),_0xc7fda7);}}if(_0x25a76c[_0x30f288(0x238)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x4825d9=String(RegExp['$1']),_0x15c994=_0x462a0d['format'](_0x4825d9,_0x30f288(0x436),-0x1,_0x30f288(0x2ca));VisuMZ[_0x30f288(0x209)]['stateTpSlipDamageJS'][_0xb050d2['id']]=new Function('stateId',_0x15c994);}else{if(_0x25a76c[_0x30f288(0x238)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if('ZlYgM'!==_0x30f288(0x265)){if(typeof _0x40d458===_0x30f288(0x1d8))_0x24aec7=_0x3cf2cb[_0x190347];const _0x124604=_0x30f288(0x243)[_0x30f288(0x497)](_0xef2e20['id']);this['_colorCache']=this[_0x30f288(0x49e)]||{};if(this[_0x30f288(0x49e)][_0x124604])return this['_colorCache'][_0x124604];const _0x38d1b5=this['retrieveStateColor'](_0x33fe6a);return this['getColorDataFromPluginParameters'](_0x124604,_0x38d1b5);}else{const _0x17574d=String(RegExp['$1']),_0x393909=_0x462a0d[_0x30f288(0x497)](_0x17574d,'heal',0x1,_0x30f288(0x2ca));VisuMZ[_0x30f288(0x209)][_0x30f288(0x352)][_0xb050d2['id']]=new Function('stateId',_0x393909);}}}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x22b)]={},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x31d)]={},VisuMZ[_0x3f7c0c(0x209)]['stateExpireJS']={},VisuMZ[_0x3f7c0c(0x209)]['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x4efd84){const _0x33311c=_0x3f7c0c,_0x33c5a6=_0x4efd84[_0x33311c(0x4de)],_0x5991a2='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x33c5a6[_0x33311c(0x238)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x2a3c87=String(RegExp['$1']),_0x41d37c=_0x5991a2['format'](_0x2a3c87);VisuMZ['SkillsStatesCore'][_0x33311c(0x22b)][_0x4efd84['id']]=new Function(_0x33311c(0x2a4),_0x41d37c);}if(_0x33c5a6['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if(_0x33311c(0x4dc)===_0x33311c(0x4dc)){const _0x3509a1=String(RegExp['$1']),_0x45ed00=_0x5991a2['format'](_0x3509a1);VisuMZ[_0x33311c(0x209)]['stateEraseJS'][_0x4efd84['id']]=new Function(_0x33311c(0x2a4),_0x45ed00);}else return this[_0x33311c(0x23e)]()[_0x33311c(0x238)](/LOWER/i);}if(_0x33c5a6[_0x33311c(0x238)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0xb6057b=String(RegExp['$1']),_0x49f44f=_0x5991a2[_0x33311c(0x497)](_0xb6057b);VisuMZ[_0x33311c(0x209)][_0x33311c(0x1b0)][_0x4efd84['id']]=new Function('stateId',_0x49f44f);}},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x1bd)]=function(){const _0x3a9f2c=_0x3f7c0c;if(!VisuMZ[_0x3a9f2c(0x209)][_0x3a9f2c(0x4a7)][_0x3a9f2c(0x1ea)][_0x3a9f2c(0x37c)])return;for(const _0x51941d of $dataStates){if(!_0x51941d)continue;_0x51941d[_0x3a9f2c(0x200)]===0x4&&_0x51941d['autoRemovalTiming']===0x1&&(_0x51941d['autoRemovalTiming']=0x2);}},DataManager[_0x3f7c0c(0x518)]=function(_0x4d7ac5){const _0x1f24c1=_0x3f7c0c;_0x4d7ac5=_0x4d7ac5[_0x1f24c1(0x20a)]()[_0x1f24c1(0x4b1)](),this[_0x1f24c1(0x344)]=this['_classIDs']||{};if(this[_0x1f24c1(0x344)][_0x4d7ac5])return this[_0x1f24c1(0x344)][_0x4d7ac5];for(const _0x529a3c of $dataClasses){if(!_0x529a3c)continue;let _0x1f5739=_0x529a3c[_0x1f24c1(0x339)];_0x1f5739=_0x1f5739[_0x1f24c1(0x3ae)](/\x1I\[(\d+)\]/gi,''),_0x1f5739=_0x1f5739[_0x1f24c1(0x3ae)](/\\I\[(\d+)\]/gi,''),this[_0x1f24c1(0x344)][_0x1f5739[_0x1f24c1(0x20a)]()[_0x1f24c1(0x4b1)]()]=_0x529a3c['id'];}return this[_0x1f24c1(0x344)][_0x4d7ac5]||0x0;},DataManager[_0x3f7c0c(0x515)]=function(_0x4b88fa){const _0x4c5ea4=_0x3f7c0c;this[_0x4c5ea4(0x295)]=this[_0x4c5ea4(0x295)]||{};if(this[_0x4c5ea4(0x295)][_0x4b88fa['id']])return this[_0x4c5ea4(0x295)][_0x4b88fa['id']];this['_stypeIDs'][_0x4b88fa['id']]=[_0x4b88fa[_0x4c5ea4(0x34c)]];if(_0x4b88fa['note'][_0x4c5ea4(0x238)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4c5ea4(0x308)==='bMhRc'){const _0x80572f=JSON['parse']('['+RegExp['$1'][_0x4c5ea4(0x238)](/\d+/g)+']');this['_stypeIDs'][_0x4b88fa['id']]=this['_stypeIDs'][_0x4b88fa['id']][_0x4c5ea4(0x390)](_0x80572f);}else _0x306ee1['SkillsStatesCore'][_0x4c5ea4(0x4a7)][_0x4c5ea4(0x3b9)][_0x4c5ea4(0x3f3)][_0x4c5ea4(0x3da)](this,_0x3bd413);}else{if(_0x4b88fa[_0x4c5ea4(0x4de)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0x4c5ea4(0x4ed)!==_0x4c5ea4(0x4ed)){if(_0x95679b[_0x4c5ea4(0x4b6)](_0x36f6fe))return!![];}else{const _0x3defca=RegExp['$1']['split'](',');for(const _0x3868e8 of _0x3defca){if(_0x4c5ea4(0x3e8)!=='UNYqX'){const _0x404dbf=DataManager[_0x4c5ea4(0x253)](_0x3868e8);if(_0x404dbf)this[_0x4c5ea4(0x295)][_0x4b88fa['id']][_0x4c5ea4(0x4c2)](_0x404dbf);}else return _0x3864b4[_0x4c5ea4(0x431)]()-0x6;}}}}return this['_stypeIDs'][_0x4b88fa['id']];},DataManager['getStypeIdWithName']=function(_0xa9f60c){const _0x2892e4=_0x3f7c0c;_0xa9f60c=_0xa9f60c['toUpperCase']()[_0x2892e4(0x4b1)](),this[_0x2892e4(0x295)]=this[_0x2892e4(0x295)]||{};if(this['_stypeIDs'][_0xa9f60c])return this[_0x2892e4(0x295)][_0xa9f60c];for(let _0x55ed82=0x1;_0x55ed82<0x64;_0x55ed82++){if(_0x2892e4(0x361)===_0x2892e4(0x354)){const _0x55ffc4=_0x307386(_0x2cd548['$1']),_0x22b799=_0x110b7a[_0x2892e4(0x497)](_0x55ffc4,'damage',-0x1,'slipMp');_0x20e391[_0x2892e4(0x209)]['stateMpSlipDamageJS'][_0x17fd28['id']]=new _0xc01371(_0x2892e4(0x2a4),_0x22b799);}else{if(!$dataSystem['skillTypes'][_0x55ed82])continue;let _0x6b6d97=$dataSystem['skillTypes'][_0x55ed82][_0x2892e4(0x20a)]()[_0x2892e4(0x4b1)]();_0x6b6d97=_0x6b6d97[_0x2892e4(0x3ae)](/\x1I\[(\d+)\]/gi,''),_0x6b6d97=_0x6b6d97[_0x2892e4(0x3ae)](/\\I\[(\d+)\]/gi,''),this[_0x2892e4(0x295)][_0x6b6d97]=_0x55ed82;}}return this[_0x2892e4(0x295)][_0xa9f60c]||0x0;},DataManager[_0x3f7c0c(0x2f4)]=function(_0x457aaf){const _0x4f2985=_0x3f7c0c;_0x457aaf=_0x457aaf[_0x4f2985(0x20a)]()[_0x4f2985(0x4b1)](),this[_0x4f2985(0x418)]=this[_0x4f2985(0x418)]||{};if(this[_0x4f2985(0x418)][_0x457aaf])return this[_0x4f2985(0x418)][_0x457aaf];for(const _0x13d952 of $dataSkills){if(!_0x13d952)continue;this['_skillIDs'][_0x13d952[_0x4f2985(0x339)]['toUpperCase']()[_0x4f2985(0x4b1)]()]=_0x13d952['id'];}return this[_0x4f2985(0x418)][_0x457aaf]||0x0;},DataManager[_0x3f7c0c(0x3ef)]=function(_0x2f3b7b){const _0x4a11eb=_0x3f7c0c;_0x2f3b7b=_0x2f3b7b[_0x4a11eb(0x20a)]()['trim'](),this[_0x4a11eb(0x409)]=this[_0x4a11eb(0x409)]||{};if(this[_0x4a11eb(0x409)][_0x2f3b7b])return this[_0x4a11eb(0x409)][_0x2f3b7b];for(const _0x5ac5d0 of $dataStates){if(!_0x5ac5d0)continue;this[_0x4a11eb(0x409)][_0x5ac5d0[_0x4a11eb(0x339)][_0x4a11eb(0x20a)]()[_0x4a11eb(0x4b1)]()]=_0x5ac5d0['id'];}return this[_0x4a11eb(0x409)][_0x2f3b7b]||0x0;},DataManager[_0x3f7c0c(0x417)]=function(_0x54206d){const _0x36beba=_0x3f7c0c;this[_0x36beba(0x316)]=this[_0x36beba(0x316)]||{};if(this[_0x36beba(0x316)][_0x54206d])return this[_0x36beba(0x316)][_0x54206d];if($dataStates[_0x54206d][_0x36beba(0x4de)]['match'](/<MAX TURNS:[ ](\d+)>/i)){if(_0x36beba(0x452)!==_0x36beba(0x452)){this[_0x36beba(0x316)]=this['_stateMaxTurns']||{};if(this[_0x36beba(0x316)][_0x5728c1])return this[_0x36beba(0x316)][_0x4cdb7e];return _0x2c80fe[_0x517ab8][_0x36beba(0x4de)][_0x36beba(0x238)](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0x195d46]=_0x3cab2d(_0x447951['$1']):this[_0x36beba(0x316)][_0xad6a87]=_0x4a9783[_0x36beba(0x209)][_0x36beba(0x4a7)][_0x36beba(0x1ea)][_0x36beba(0x227)],this['_stateMaxTurns'][_0x360a4c];}else this[_0x36beba(0x316)][_0x54206d]=Number(RegExp['$1']);}else this['_stateMaxTurns'][_0x54206d]=VisuMZ[_0x36beba(0x209)][_0x36beba(0x4a7)]['States'][_0x36beba(0x227)];return this[_0x36beba(0x316)][_0x54206d];},VisuMZ[_0x3f7c0c(0x209)]['createKeyJS']=function(_0xa55ad3,_0x533584){const _0x1db28f=_0x3f7c0c;if(VisuMZ[_0x1db28f(0x1de)])return VisuMZ['createKeyJS'](_0xa55ad3,_0x533584);let _0x48ce0b='';if($dataActors[_0x1db28f(0x486)](_0xa55ad3))_0x48ce0b='Actor-%1-%2'[_0x1db28f(0x497)](_0xa55ad3['id'],_0x533584);if($dataClasses[_0x1db28f(0x486)](_0xa55ad3))_0x48ce0b=_0x1db28f(0x500)[_0x1db28f(0x497)](_0xa55ad3['id'],_0x533584);if($dataSkills[_0x1db28f(0x486)](_0xa55ad3))_0x48ce0b='Skill-%1-%2'[_0x1db28f(0x497)](_0xa55ad3['id'],_0x533584);if($dataItems[_0x1db28f(0x486)](_0xa55ad3))_0x48ce0b=_0x1db28f(0x301)['format'](_0xa55ad3['id'],_0x533584);if($dataWeapons['includes'](_0xa55ad3))_0x48ce0b=_0x1db28f(0x2b2)['format'](_0xa55ad3['id'],_0x533584);if($dataArmors[_0x1db28f(0x486)](_0xa55ad3))_0x48ce0b=_0x1db28f(0x3a8)['format'](_0xa55ad3['id'],_0x533584);if($dataEnemies[_0x1db28f(0x486)](_0xa55ad3))_0x48ce0b='Enemy-%1-%2'[_0x1db28f(0x497)](_0xa55ad3['id'],_0x533584);if($dataStates[_0x1db28f(0x486)](_0xa55ad3))_0x48ce0b=_0x1db28f(0x430)[_0x1db28f(0x497)](_0xa55ad3['id'],_0x533584);return _0x48ce0b;},ColorManager[_0x3f7c0c(0x2d1)]=function(_0x5b5d19,_0x23d69c){const _0x1a22af=_0x3f7c0c;_0x23d69c=String(_0x23d69c),this[_0x1a22af(0x49e)]=this[_0x1a22af(0x49e)]||{};if(_0x23d69c[_0x1a22af(0x238)](/#(.*)/i))this[_0x1a22af(0x49e)][_0x5b5d19]=_0x1a22af(0x237)[_0x1a22af(0x497)](String(RegExp['$1']));else{if(_0x1a22af(0x460)!=='MitgJ'){if(_0x1c19d2[_0x1a22af(0x3a9)]())_0x368b61[_0x1a22af(0x4ff)](_0x2531f9);}else this['_colorCache'][_0x5b5d19]=this['textColor'](Number(_0x23d69c));}return this[_0x1a22af(0x49e)][_0x5b5d19];},ColorManager[_0x3f7c0c(0x4e1)]=function(_0x32b689){const _0x3d4ebe=_0x3f7c0c;return _0x32b689=String(_0x32b689),_0x32b689['match'](/#(.*)/i)?_0x3d4ebe(0x237)[_0x3d4ebe(0x497)](String(RegExp['$1'])):this['textColor'](Number(_0x32b689));},ColorManager['stateColor']=function(_0x10b1a6){const _0x36fa2f=_0x3f7c0c;if(typeof _0x10b1a6==='number')_0x10b1a6=$dataStates[_0x10b1a6];const _0x1b743e='_stored_state-%1-color'[_0x36fa2f(0x497)](_0x10b1a6['id']);this[_0x36fa2f(0x49e)]=this[_0x36fa2f(0x49e)]||{};if(this['_colorCache'][_0x1b743e])return this[_0x36fa2f(0x49e)][_0x1b743e];const _0x4b1a68=this[_0x36fa2f(0x207)](_0x10b1a6);return this['getColorDataFromPluginParameters'](_0x1b743e,_0x4b1a68);},ColorManager['retrieveStateColor']=function(_0x23a8d1){const _0x26ef99=_0x3f7c0c,_0x3cdaec=_0x23a8d1[_0x26ef99(0x4de)];if(_0x3cdaec[_0x26ef99(0x238)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x3cdaec['match'](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore']['Settings']['States'][_0x26ef99(0x4cf)];else{if(_0x3cdaec[_0x26ef99(0x238)](/<NEGATIVE STATE>/i))return VisuMZ[_0x26ef99(0x209)]['Settings'][_0x26ef99(0x1ea)][_0x26ef99(0x4ab)];else{if(_0x26ef99(0x369)===_0x26ef99(0x26d)){const _0x30bd03=_0x24c80e[_0x26ef99(0x4e0)]('['+_0x4999b9['$1']['match'](/\d+/g)+']');for(const _0x526455 of _0x30bd03){if(!_0x592f7c[_0x26ef99(0x2fe)](_0x526455))return![];}return!![];}else return VisuMZ[_0x26ef99(0x209)][_0x26ef99(0x4a7)][_0x26ef99(0x1ea)][_0x26ef99(0x4fa)];}}}},ColorManager['buffColor']=function(){const _0xaffa40=_0x3f7c0c,_0x1fa650=_0xaffa40(0x4f2);this[_0xaffa40(0x49e)]=this['_colorCache']||{};if(this[_0xaffa40(0x49e)][_0x1fa650])return this[_0xaffa40(0x49e)][_0x1fa650];const _0x3862a9=VisuMZ[_0xaffa40(0x209)][_0xaffa40(0x4a7)]['Buffs'][_0xaffa40(0x2c3)];return this[_0xaffa40(0x2d1)](_0x1fa650,_0x3862a9);},ColorManager[_0x3f7c0c(0x4af)]=function(){const _0x54ef92=_0x3f7c0c,_0x195771=_0x54ef92(0x30c);this[_0x54ef92(0x49e)]=this[_0x54ef92(0x49e)]||{};if(this[_0x54ef92(0x49e)][_0x195771])return this[_0x54ef92(0x49e)][_0x195771];const _0x456069=VisuMZ[_0x54ef92(0x209)][_0x54ef92(0x4a7)][_0x54ef92(0x3b9)]['ColorDebuff'];return this[_0x54ef92(0x2d1)](_0x195771,_0x456069);},SceneManager[_0x3f7c0c(0x2b5)]=function(){const _0x56a77f=_0x3f7c0c;return this[_0x56a77f(0x39e)]&&this[_0x56a77f(0x39e)][_0x56a77f(0x1dd)]===Scene_Battle;},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x2f6)]=BattleManager[_0x3f7c0c(0x2ed)],BattleManager[_0x3f7c0c(0x2ed)]=function(){const _0x41eef2=_0x3f7c0c;this['updateStatesActionEnd'](),VisuMZ[_0x41eef2(0x209)][_0x41eef2(0x2f6)][_0x41eef2(0x3da)](this);},BattleManager[_0x3f7c0c(0x272)]=function(){const _0x58eb11=_0x3f7c0c,_0x425349=VisuMZ['SkillsStatesCore'][_0x58eb11(0x4a7)][_0x58eb11(0x1ea)];if(!_0x425349)return;if(_0x425349['ActionEndUpdate']===![])return;if(!this[_0x58eb11(0x410)])return;this[_0x58eb11(0x410)][_0x58eb11(0x272)]();},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x272)]=function(){const _0x566774=_0x3f7c0c;if(BattleManager['_phase']!==_0x566774(0x4ca))return;if(this['_lastStatesActionEndFrameCount']===Graphics[_0x566774(0x458)])return;this['_lastStatesActionEndFrameCount']=Graphics[_0x566774(0x458)];for(const _0x3f203e of this[_0x566774(0x271)]){if(_0x566774(0x1c7)!==_0x566774(0x1c7)){const _0xd52011=_0x3c8981[_0x566774(0x39c)];for(const _0x382ff4 of _0xd52011){if(!_0x21f8fd[_0x566774(0x4b6)](_0x382ff4))return![];}}else{const _0x51a026=$dataStates[_0x3f203e];if(!_0x51a026)continue;if(_0x51a026['autoRemovalTiming']!==0x1)continue;this[_0x566774(0x1b9)][_0x3f203e]>0x0&&this['_stateTurns'][_0x3f203e]--;}}this['removeStatesAuto'](0x1);},Game_BattlerBase['prototype']['updateStateTurns']=function(){const _0x2c1905=_0x3f7c0c,_0x4941b0=VisuMZ[_0x2c1905(0x209)][_0x2c1905(0x4a7)][_0x2c1905(0x1ea)];for(const _0x5e29cf of this[_0x2c1905(0x271)]){if(_0x2c1905(0x23f)===_0x2c1905(0x336))return _0x100534[_0x2c1905(0x431)]()-0x2;else{const _0x5a627d=$dataStates[_0x5e29cf];if(_0x4941b0&&_0x4941b0[_0x2c1905(0x37c)]!==![]){if('DpRxo'===_0x2c1905(0x444)){if(_0x5a627d&&_0x5a627d[_0x2c1905(0x3d4)]===0x1)continue;}else _0x44231b[_0x2c1905(0x3b6)][_0x2c1905(0x47d)]['call'](this,this['_actor'],_0x5a3fa2,_0x179564,_0x3f29dd,_0x1a08cf);}this['_stateTurns'][_0x5e29cf]>0x0&&('qjHvJ'===_0x2c1905(0x2a6)?this['_stateTurns'][_0x5e29cf]--:(!_0x2fd662[_0x2c1905(0x486)](_0x34d8c8)&&this[_0x2c1905(0x3c8)](_0x3f5f4c,_0x3756f0,_0x5b4a63,_0x1b35a2),this[_0x2c1905(0x4db)](_0x5190e3,_0x48c08c,_0x1f4975,_0x3dd495),_0x2af92a[_0x2c1905(0x4c2)](_0x2e43d5)));}}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x1cf)]=Game_Switches[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x35e)],Game_Switches[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x35e)]=function(){const _0x45d33a=_0x3f7c0c;VisuMZ['SkillsStatesCore'][_0x45d33a(0x1cf)][_0x45d33a(0x3da)](this);const _0x4c4235=VisuMZ[_0x45d33a(0x209)][_0x45d33a(0x4a7)][_0x45d33a(0x3bb)][_0x45d33a(0x4b5)]??!![];if(!_0x4c4235)return;if(SceneManager[_0x45d33a(0x2b5)]())for(const _0x8d9902 of BattleManager[_0x45d33a(0x3a5)]()){if(_0x45d33a(0x202)!==_0x45d33a(0x202))this[_0x45d33a(0x353)](_0xa7a53f,_0x26bcdf);else{if(_0x8d9902)_0x8d9902['refresh']();}}},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x1d5)]=Game_Variables[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x35e)],Game_Variables[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x35e)]=function(){const _0x34b562=_0x3f7c0c;VisuMZ[_0x34b562(0x209)]['Game_Variables_onChange'][_0x34b562(0x3da)](this);const _0xf9191f=VisuMZ['SkillsStatesCore'][_0x34b562(0x4a7)][_0x34b562(0x3bb)][_0x34b562(0x3fa)]??!![];if(!_0xf9191f)return;if(SceneManager[_0x34b562(0x2b5)]())for(const _0x3ae8ad of BattleManager['allBattleMembers']()){if(_0x3ae8ad)_0x3ae8ad[_0x34b562(0x37b)]();}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x2c4)]=Game_Action[_0x3f7c0c(0x3b6)]['applyItemUserEffect'],Game_Action[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1e6)]=function(_0x4d780c){const _0x5a1356=_0x3f7c0c;VisuMZ[_0x5a1356(0x209)]['Game_Action_applyItemUserEffect']['call'](this,_0x4d780c),this[_0x5a1356(0x22d)](_0x4d780c);},Game_Action[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x22d)]=function(_0x54dd42){const _0xb2ba9c=_0x3f7c0c;this[_0xb2ba9c(0x320)](_0x54dd42),this[_0xb2ba9c(0x277)](_0x54dd42),this['applyBuffTurnManipulationEffects'](_0x54dd42),this[_0xb2ba9c(0x396)](_0x54dd42);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x2fa)]=Game_Action[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x438)],Game_Action[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x438)]=function(_0x14be8f){const _0x1b8c37=_0x3f7c0c;if(this[_0x1b8c37(0x450)](_0x14be8f))return!![];return VisuMZ['SkillsStatesCore']['Game_Action_testApply']['call'](this,_0x14be8f);},Game_Action[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x450)]=function(_0x493a85){const _0x13ef68=_0x3f7c0c;if(!this[_0x13ef68(0x3b0)]())return;const _0x2f8748=this[_0x13ef68(0x3b0)]()[_0x13ef68(0x4de)];if(_0x2f8748[_0x13ef68(0x238)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x32a081=String(RegExp['$1']);if(_0x493a85[_0x13ef68(0x4cd)](_0x32a081))return!![];}if(_0x2f8748[_0x13ef68(0x238)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if('CnfOb'!=='CnfOb')return _0x4684c2['SkillsStatesCore'][_0x13ef68(0x4a7)][_0x13ef68(0x3bb)][_0x13ef68(0x3c6)][_0x13ef68(0x3da)](this,_0x4ca32f);else{const _0x37a0bc=Number(RegExp['$1']);if(_0x493a85[_0x13ef68(0x248)](_0x37a0bc))return!![];}}else{if(_0x2f8748[_0x13ef68(0x238)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x13ef68(0x2bf)!==_0x13ef68(0x1fd)){const _0x301790=DataManager[_0x13ef68(0x3ef)](RegExp['$1']);if(_0x493a85[_0x13ef68(0x248)](_0x301790))return!![];}else{this[_0x13ef68(0x4fc)](_0x436ed1)['match'](/\\I\[(\d+)\]/i);const _0x210373=_0x16f9c0(_0x520244['$1'])||0x0,_0x2dad7a=this[_0x13ef68(0x2ab)](_0x2ecb57),_0x58f7ae=_0x2dad7a['x']+_0xb0cdd4[_0x13ef68(0x3e9)]((_0x2dad7a['width']-_0x4fa559[_0x13ef68(0x249)])/0x2),_0x323740=_0x2dad7a['y']+(_0x2dad7a[_0x13ef68(0x1cc)]-_0x3583ba[_0x13ef68(0x25a)])/0x2;this[_0x13ef68(0x222)](_0x210373,_0x58f7ae,_0x323740);}}}return![];},Game_Action[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x320)]=function(_0x338fa6){const _0x26981d=_0x3f7c0c;if(_0x338fa6[_0x26981d(0x4ee)]()['length']<=0x0)return;const _0xcab2a3=this[_0x26981d(0x3b0)]()['note'];{const _0x56db16=_0xcab2a3['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x56db16)for(const _0x380996 of _0x56db16){_0x380996[_0x26981d(0x238)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x438ba4=String(RegExp['$1']);_0x338fa6[_0x26981d(0x50c)](_0x438ba4);}}{if('XfizR'!==_0x26981d(0x375)){const _0xadad89=_0xcab2a3[_0x26981d(0x238)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0xadad89){if(_0x26981d(0x30f)==='UxuWz')for(const _0x59d364 of _0xadad89){if(_0x26981d(0x510)===_0x26981d(0x510)){_0x59d364[_0x26981d(0x238)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x4e7b21=String(RegExp['$1']),_0x4de405=Number(RegExp['$2']);_0x338fa6[_0x26981d(0x32d)](_0x4e7b21,_0x4de405);}else{const _0x42141b=_0x4abd7f[_0x26981d(0x253)](_0xaa2038);if(_0x42141b)this[_0x26981d(0x295)][_0x5af845['id']][_0x26981d(0x4c2)](_0x42141b);}}else{if(_0x525fde['_subject'])return _0x450476['_subject'];else{if(_0x1f124e[_0x26981d(0x279)])return _0x255e74[_0x26981d(0x279)];}}}}else return _0x26981d(0x3c4);}},Game_Action[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x277)]=function(_0x4287f3){const _0x1bae2a=_0x3f7c0c,_0x4311df=this[_0x1bae2a(0x3b0)]()[_0x1bae2a(0x4de)],_0x2ea051=_0x4311df[_0x1bae2a(0x238)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x2ea051)for(const _0x10be8d of _0x2ea051){let _0xf6303e=0x0,_0x54c340=0x0;if(_0x10be8d['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x1bae2a(0x3cc)===_0x1bae2a(0x3cc))_0xf6303e=Number(RegExp['$1']),_0x54c340=Number(RegExp['$2']);else{if(_0x255c53[_0x1bae2a(0x1e8)]&&_0x2200d3[_0x1bae2a(0x257)]!==_0x49b96a)return _0x20f1de['uiInputPosition'];else return this[_0x1bae2a(0x441)]()?this['updatedLayoutStyle']()[_0x1bae2a(0x238)](/RIGHT/i):_0x3f7d01[_0x1bae2a(0x3b6)][_0x1bae2a(0x310)][_0x1bae2a(0x3da)](this);}}else _0x10be8d[_0x1bae2a(0x238)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&('YCmoq'==='vWDxC'?_0x70ac46['prototype'][_0x1bae2a(0x310)][_0x1bae2a(0x3da)](this):(_0xf6303e=DataManager[_0x1bae2a(0x3ef)](RegExp['$1']),_0x54c340=Number(RegExp['$2'])));_0x4287f3[_0x1bae2a(0x3f6)](_0xf6303e,_0x54c340),this[_0x1bae2a(0x4c9)](_0x4287f3);}const _0x1d99f8=_0x4311df[_0x1bae2a(0x238)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1d99f8){if(_0x1bae2a(0x1c1)!==_0x1bae2a(0x1fb))for(const _0x22499a of _0x1d99f8){let _0x312d8a=0x0,_0x2eafb2=0x0;if(_0x22499a[_0x1bae2a(0x238)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x312d8a=Number(RegExp['$1']),_0x2eafb2=Number(RegExp['$2']);else _0x22499a[_0x1bae2a(0x238)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x312d8a=DataManager[_0x1bae2a(0x3ef)](RegExp['$1']),_0x2eafb2=Number(RegExp['$2']));_0x4287f3[_0x1bae2a(0x233)](_0x312d8a,_0x2eafb2),this['makeSuccess'](_0x4287f3);}else return this[_0x1bae2a(0x441)]()?this[_0x1bae2a(0x462)]():_0x3b001e[_0x1bae2a(0x209)]['Scene_Skill_helpWindowRect'][_0x1bae2a(0x3da)](this);}},Game_Action[_0x3f7c0c(0x3b6)]['applyBuffTurnManipulationEffects']=function(_0x161e3f){const _0x8143ac=_0x3f7c0c,_0x3fe482=[_0x8143ac(0x3d3),_0x8143ac(0x455),'ATK',_0x8143ac(0x252),_0x8143ac(0x3e2),'MDF',_0x8143ac(0x2c9),_0x8143ac(0x236)],_0x3e1dea=this['item']()['note'],_0x1df642=_0x3e1dea[_0x8143ac(0x238)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x1df642){if('SQZhR'===_0x8143ac(0x388))this[_0x8143ac(0x385)](_0x32e9d0,_0x4f8a11);else for(const _0x1c3079 of _0x1df642){_0x1c3079[_0x8143ac(0x238)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x3f251c=_0x3fe482[_0x8143ac(0x1d0)](String(RegExp['$1'])[_0x8143ac(0x20a)]()),_0x5aab4b=Number(RegExp['$2']);_0x3f251c>=0x0&&(_0x161e3f[_0x8143ac(0x3ad)](_0x3f251c,_0x5aab4b),this[_0x8143ac(0x4c9)](_0x161e3f));}}const _0x1cad60=_0x3e1dea['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1cad60){if(_0x8143ac(0x45a)===_0x8143ac(0x2a8)){if(typeof _0xe9265a===_0x8143ac(0x1d8))_0xe2ec14=_0x44d7b8[_0x17cd67];return this[_0x8143ac(0x4ee)]()[_0x8143ac(0x486)](_0xb90635);}else for(const _0x4e114a of _0x1df642){_0x4e114a[_0x8143ac(0x238)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x10fa2a=_0x3fe482[_0x8143ac(0x1d0)](String(RegExp['$1'])['toUpperCase']()),_0x1866a4=Number(RegExp['$2']);_0x10fa2a>=0x0&&(_0x161e3f['addBuffTurns'](_0x10fa2a,_0x1866a4),this[_0x8143ac(0x4c9)](_0x161e3f));}}},Game_Action['prototype'][_0x3f7c0c(0x396)]=function(_0x278f10){const _0x4bc070=_0x3f7c0c,_0xc850f0=['MAXHP','MAXMP',_0x4bc070(0x456),_0x4bc070(0x252),_0x4bc070(0x3e2),_0x4bc070(0x298),'AGI','LUK'],_0xd68f93=this[_0x4bc070(0x3b0)]()[_0x4bc070(0x4de)],_0x4616b8=_0xd68f93[_0x4bc070(0x238)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x4616b8)for(const _0x1c744f of _0x4616b8){_0x1c744f[_0x4bc070(0x238)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x4948c2=_0xc850f0['indexOf'](String(RegExp['$1'])[_0x4bc070(0x20a)]()),_0x212436=Number(RegExp['$2']);_0x4948c2>=0x0&&(_0x278f10[_0x4bc070(0x2ce)](_0x4948c2,_0x212436),this[_0x4bc070(0x4c9)](_0x278f10));}const _0x475680=_0xd68f93[_0x4bc070(0x238)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x475680){if(_0x4bc070(0x296)!==_0x4bc070(0x504))for(const _0x13754e of _0x4616b8){if(_0x4bc070(0x2a5)!==_0x4bc070(0x498)){_0x13754e['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x443807=_0xc850f0[_0x4bc070(0x1d0)](String(RegExp['$1'])[_0x4bc070(0x20a)]()),_0x2ad5f8=Number(RegExp['$2']);if(_0x443807>=0x0){if(_0x4bc070(0x362)!==_0x4bc070(0x362))return this['skills']()[_0x4bc070(0x43a)](_0x5832a9=>this[_0x4bc070(0x3f0)](_0x5832a9));else _0x278f10[_0x4bc070(0x50d)](_0x443807,_0x2ad5f8),this[_0x4bc070(0x4c9)](_0x278f10);}}else{let _0x34a5cf=_0x2f21f5[_0x4bc070(0x437)][_0x4bc070(0x3da)](_0x288f54,_0x37e55a);return _0x34a5cf=_0xd0c8b2[_0x4bc070(0x42f)](_0x53db7b,_0x34a5cf,_0x400441),_0x58ccd1[_0x4bc070(0x232)]['call'](_0x2fb6b9,_0x3a6562,_0x34a5cf,_0x30d533);}}else{const _0x50c089=_0x5ca77c[_0x4bc070(0x209)][_0x4bc070(0x413)];if(_0x50c089[_0x35a71e['id']]&&!_0x50c089[_0x28b55a['id']][_0x4bc070(0x3da)](this,_0x118602))return![];return!![];}}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x27d)]=Game_BattlerBase[_0x3f7c0c(0x3b6)]['initMembers'],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x433)]=function(){const _0xc3a837=_0x3f7c0c;this[_0xc3a837(0x2ef)]={},this[_0xc3a837(0x2df)](),VisuMZ[_0xc3a837(0x209)][_0xc3a837(0x27d)][_0xc3a837(0x3da)](this);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2df)]=function(){const _0x2b1b08=_0x3f7c0c;this[_0x2b1b08(0x4da)]='',this[_0x2b1b08(0x355)]={},this['_stateDisplay']={},this[_0x2b1b08(0x31e)]={};},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x502)]=function(_0x881cad){const _0x5b129c=_0x3f7c0c;return this[_0x5b129c(0x2ef)]=this['_cache']||{},this[_0x5b129c(0x2ef)][_0x881cad]!==undefined;},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x294)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x37b)],Game_BattlerBase['prototype'][_0x3f7c0c(0x37b)]=function(){const _0x27a5ae=_0x3f7c0c;this[_0x27a5ae(0x2ef)]={},VisuMZ[_0x27a5ae(0x209)]['Game_BattlerBase_refresh'][_0x27a5ae(0x3da)](this);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x28a)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2e0)],Game_BattlerBase['prototype'][_0x3f7c0c(0x2e0)]=function(_0xdbb45d){const _0x1d9c9a=_0x3f7c0c;let _0x3271fc=this[_0x1d9c9a(0x248)](_0xdbb45d);VisuMZ[_0x1d9c9a(0x209)]['Game_BattlerBase_eraseState'][_0x1d9c9a(0x3da)](this,_0xdbb45d);if(_0x3271fc&&!this['isStateAffected'](_0xdbb45d))this['onRemoveState'](_0xdbb45d);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x259)]=function(_0x201c28){const _0x5022e4=_0x3f7c0c;this[_0x5022e4(0x3bd)](_0x201c28),this['clearStateDisplay'](_0x201c28);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x519)]=Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x23c)],Game_Battler['prototype'][_0x3f7c0c(0x23c)]=function(){const _0x2a4d8b=_0x3f7c0c;VisuMZ['SkillsStatesCore'][_0x2a4d8b(0x519)][_0x2a4d8b(0x3da)](this),this['clearAllStateOrigins']();},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x288)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x37f)],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x37f)]=function(_0x3c9c75){const _0x3e900b=_0x3f7c0c,_0x1ccedf=$dataStates[_0x3c9c75],_0x223301=this[_0x3e900b(0x2c7)](_0x3c9c75),_0x3acff5=this['getStateReapplyRulings'](_0x1ccedf)['toLowerCase']()['trim']();switch(_0x3acff5){case _0x3e900b(0x309):if(_0x223301<=0x0)this[_0x3e900b(0x2d6)](_0x3c9c75);break;case _0x3e900b(0x2e9):this[_0x3e900b(0x2d6)](_0x3c9c75);break;case _0x3e900b(0x1ad):this[_0x3e900b(0x2d6)](_0x3c9c75),this[_0x3e900b(0x1b9)][_0x3c9c75]=Math[_0x3e900b(0x318)](this[_0x3e900b(0x1b9)][_0x3c9c75],_0x223301);break;case'add':this[_0x3e900b(0x2d6)](_0x3c9c75),this[_0x3e900b(0x1b9)][_0x3c9c75]+=_0x223301;break;default:this[_0x3e900b(0x2d6)](_0x3c9c75);break;}if(this[_0x3e900b(0x248)](_0x3c9c75)){const _0x4b9dd4=DataManager[_0x3e900b(0x417)](_0x3c9c75);this[_0x3e900b(0x1b9)][_0x3c9c75]=this[_0x3e900b(0x1b9)][_0x3c9c75][_0x3e900b(0x256)](0x0,_0x4b9dd4);}},Game_BattlerBase['prototype']['prepareResetStateCounts']=function(_0x8b2bf1){const _0x5916f0=_0x3f7c0c;VisuMZ[_0x5916f0(0x209)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x8b2bf1);},Game_BattlerBase[_0x3f7c0c(0x3b6)]['getStateReapplyRulings']=function(_0x427295){const _0x12348b=_0x3f7c0c,_0x139c8a=_0x427295['note'];return _0x139c8a[_0x12348b(0x238)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):'NJtjm'==='ObofS'?_0x3bfd0a['status']&&_0x287bb6[_0x12348b(0x47a)][_0x12348b(0x486)]('['+_0x2f5550+']'):VisuMZ[_0x12348b(0x209)]['Settings'][_0x12348b(0x1ea)][_0x12348b(0x2e3)];},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x231)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x304)],Game_BattlerBase['prototype']['overwriteBuffTurns']=function(_0x58e4c6,_0x51bebb){const _0x12fdc7=_0x3f7c0c,_0x49d275=VisuMZ['SkillsStatesCore'][_0x12fdc7(0x4a7)]['Buffs'][_0x12fdc7(0x2e3)],_0x4b4f91=this[_0x12fdc7(0x230)](_0x58e4c6);switch(_0x49d275){case _0x12fdc7(0x309):if(_0x4b4f91<=0x0)this[_0x12fdc7(0x334)][_0x58e4c6]=_0x51bebb;break;case _0x12fdc7(0x2e9):this[_0x12fdc7(0x334)][_0x58e4c6]=_0x51bebb;break;case _0x12fdc7(0x1ad):this[_0x12fdc7(0x334)][_0x58e4c6]=Math['max'](_0x4b4f91,_0x51bebb);break;case _0x12fdc7(0x4c0):this[_0x12fdc7(0x334)][_0x58e4c6]+=_0x51bebb;break;default:VisuMZ[_0x12fdc7(0x209)][_0x12fdc7(0x231)]['call'](this,_0x58e4c6,_0x51bebb);break;}const _0x15179b=VisuMZ['SkillsStatesCore']['Settings'][_0x12fdc7(0x3b9)][_0x12fdc7(0x227)];this[_0x12fdc7(0x334)][_0x58e4c6]=this['_buffTurns'][_0x58e4c6]['clamp'](0x0,_0x15179b);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x46b)]=function(){const _0x35eff1=_0x3f7c0c;if(this[_0x35eff1(0x2ef)][_0x35eff1(0x36e)]!==undefined)return this[_0x35eff1(0x2ef)]['groupDefeat'];this[_0x35eff1(0x2ef)][_0x35eff1(0x36e)]=![];const _0x107871=this[_0x35eff1(0x4ee)]();for(const _0xf4251e of _0x107871){if(!_0xf4251e)continue;if(_0xf4251e[_0x35eff1(0x4de)]['match'](/<GROUP DEFEAT>/i)){this[_0x35eff1(0x2ef)][_0x35eff1(0x36e)]=!![];break;}}return this[_0x35eff1(0x2ef)][_0x35eff1(0x36e)];},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x454)]=Game_Unit[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x368)],Game_Unit[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x368)]=function(){const _0x470916=_0x3f7c0c;let _0x48e30d=VisuMZ['SkillsStatesCore']['Game_Unit_deadMembers'][_0x470916(0x3da)](this);return BattleManager[_0x470916(0x3f5)]&&(_0x48e30d=_0x48e30d[_0x470916(0x390)](this[_0x470916(0x1ed)]()[_0x470916(0x43a)](_0x4ba749=>_0x4ba749[_0x470916(0x46b)]()))),_0x48e30d;},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x2a3)]=Game_BattlerBase['prototype']['clearStates'],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3fc)]=function(){const _0x508c51=_0x3f7c0c;this[_0x508c51(0x2db)]()!==''?_0x508c51(0x3a1)===_0x508c51(0x3a1)?this['clearStatesWithStateRetain']():(this['setStateRetainType'](_0x508c51(0x49a)),_0x4e9d15['SkillsStatesCore'][_0x508c51(0x37e)][_0x508c51(0x3da)](this),this[_0x508c51(0x1cb)]()):(VisuMZ['SkillsStatesCore']['Game_BattlerBase_clearStates'][_0x508c51(0x3da)](this),this[_0x508c51(0x2df)]());},Game_Actor[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3fc)]=function(){const _0x13a603=_0x3f7c0c;this[_0x13a603(0x439)]=this[_0x13a603(0x439)]||{},Game_Battler[_0x13a603(0x3b6)]['clearStates'][_0x13a603(0x3da)](this);},Game_BattlerBase[_0x3f7c0c(0x3b6)]['clearStatesWithStateRetain']=function(){const _0x2b3310=_0x3f7c0c,_0x6da897=this[_0x2b3310(0x4ee)]();for(const _0x513cb4 of _0x6da897){if(_0x513cb4&&this['canClearState'](_0x513cb4))this[_0x2b3310(0x2e0)](_0x513cb4['id']);}this[_0x2b3310(0x2ef)]={};},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x446)]=function(_0x35512f){const _0x429b2f=_0x3f7c0c,_0x28844a=this[_0x429b2f(0x2db)]();if(_0x28844a!==''){const _0x34c4cc=_0x35512f[_0x429b2f(0x4de)];if(_0x28844a==='death'&&_0x34c4cc[_0x429b2f(0x238)](/<NO DEATH CLEAR>/i))return![];if(_0x28844a===_0x429b2f(0x38d)&&_0x34c4cc[_0x429b2f(0x238)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x429b2f(0x248)](_0x35512f['id']);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2db)]=function(){const _0x5596f1=_0x3f7c0c;return this[_0x5596f1(0x4da)];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x26b)]=function(_0x51451c){const _0x389b9c=_0x3f7c0c;this[_0x389b9c(0x4da)]=_0x51451c;},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1cb)]=function(){const _0x590966=_0x3f7c0c;this[_0x590966(0x4da)]='';},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x37e)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3ac)],Game_BattlerBase['prototype'][_0x3f7c0c(0x3ac)]=function(){const _0x5ac540=_0x3f7c0c;this[_0x5ac540(0x26b)](_0x5ac540(0x49a)),VisuMZ['SkillsStatesCore'][_0x5ac540(0x37e)][_0x5ac540(0x3da)](this),this[_0x5ac540(0x1cb)]();},VisuMZ[_0x3f7c0c(0x209)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2e6)],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2e6)]=function(){const _0x327a88=_0x3f7c0c;this['setStateRetainType'](_0x327a88(0x38d)),VisuMZ[_0x327a88(0x209)]['Game_BattlerBase_recoverAll']['call'](this),this['clearStateRetainType']();},Game_BattlerBase[_0x3f7c0c(0x3b6)]['adjustSkillCost']=function(_0x5e3079,_0x4c70a0,_0x36843b){return _0x4c70a0;},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3aa)]=function(_0x46334f){const _0x2758fc=_0x3f7c0c;for(settings of VisuMZ[_0x2758fc(0x209)][_0x2758fc(0x4a7)][_0x2758fc(0x503)]){if(_0x2758fc(0x4a9)!==_0x2758fc(0x4a9))this[_0x2758fc(0x3b3)][_0x2fe5d3]='';else{let _0x2dad31=settings[_0x2758fc(0x437)][_0x2758fc(0x3da)](this,_0x46334f);_0x2dad31=this[_0x2758fc(0x42f)](_0x46334f,_0x2dad31,settings);if(!settings[_0x2758fc(0x276)][_0x2758fc(0x3da)](this,_0x46334f,_0x2dad31))return![];}}return!![];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x487)]=function(_0x1215e6){const _0x3ec803=_0x3f7c0c;for(settings of VisuMZ[_0x3ec803(0x209)][_0x3ec803(0x4a7)]['Costs']){let _0x436f7a=settings[_0x3ec803(0x437)]['call'](this,_0x1215e6);_0x436f7a=this[_0x3ec803(0x42f)](_0x1215e6,_0x436f7a,settings),settings[_0x3ec803(0x20c)]['call'](this,_0x1215e6,_0x436f7a);}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x25d)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2f3)],Game_BattlerBase['prototype'][_0x3f7c0c(0x2f3)]=function(_0x3a14b6){const _0x5df96e=_0x3f7c0c;if(!_0x3a14b6)return![];if(!VisuMZ[_0x5df96e(0x209)][_0x5df96e(0x25d)]['call'](this,_0x3a14b6))return![];if(!this[_0x5df96e(0x3eb)](_0x3a14b6))return![];if(!this[_0x5df96e(0x1b5)](_0x3a14b6))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x3a14b6))return![];return!![];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3eb)]=function(_0x281ab4){const _0xb22f0e=_0x3f7c0c;if(!this[_0xb22f0e(0x4ea)](_0x281ab4))return![];return!![];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4ea)]=function(_0x4b9b17){const _0x430ede=_0x3f7c0c,_0x5f1d82=_0x4b9b17['note'];if(_0x5f1d82['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c0042=JSON[_0x430ede(0x4e0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x31944d of _0x3c0042){if(!$gameSwitches[_0x430ede(0x4b6)](_0x31944d))return![];}return!![];}if(_0x5f1d82['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4f7f51=JSON[_0x430ede(0x4e0)]('['+RegExp['$1'][_0x430ede(0x238)](/\d+/g)+']');for(const _0x1e3ebf of _0x4f7f51){if(!$gameSwitches[_0x430ede(0x4b6)](_0x1e3ebf))return![];}return!![];}if(_0x5f1d82['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2258b1=JSON['parse']('['+RegExp['$1'][_0x430ede(0x238)](/\d+/g)+']');for(const _0xa0a36a of _0x2258b1){if(_0x430ede(0x38b)===_0x430ede(0x2d7))this['contents'][_0x430ede(0x4a8)]=_0x3f6977['mainFontFace'](),this[_0x430ede(0x30b)][_0x430ede(0x2ec)]=_0x532135[_0x430ede(0x431)](),this['resetTextColor']();else{if($gameSwitches[_0x430ede(0x4b6)](_0xa0a36a))return!![];}}return![];}if(_0x5f1d82[_0x430ede(0x238)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x430ede(0x31f)!==_0x430ede(0x2f5)){const _0x37eea2=JSON['parse']('['+RegExp['$1'][_0x430ede(0x238)](/\d+/g)+']');for(const _0xd74860 of _0x37eea2){if(!$gameSwitches[_0x430ede(0x4b6)](_0xd74860))return!![];}return![];}else _0x4d2685+=this[_0x430ede(0x230)](_0x456403),this[_0x430ede(0x2ce)](_0x5158a6,_0x790b67);}if(_0x5f1d82[_0x430ede(0x238)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d5e98=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x533a3d of _0x1d5e98){if(!$gameSwitches[_0x430ede(0x4b6)](_0x533a3d))return!![];}return![];}if(_0x5f1d82[_0x430ede(0x238)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x430ede(0x1c5)!==_0x430ede(0x443)){const _0x1e5631=JSON[_0x430ede(0x4e0)]('['+RegExp['$1'][_0x430ede(0x238)](/\d+/g)+']');for(const _0x426d6d of _0x1e5631){if($gameSwitches[_0x430ede(0x4b6)](_0x426d6d))return![];}return!![];}else{const _0xe5cbb=_0x52af10[_0x430ede(0x20e)]-this['shopStatusWidth'](),_0x213b1d=this[_0x430ede(0x4e7)]()-this['_statusWindow'][_0x430ede(0x1cc)],_0x5132cb=this[_0x430ede(0x310)]()?_0x5cbb27[_0x430ede(0x20e)]-_0xe5cbb:0x0,_0x55b2c9=this[_0x430ede(0x1e4)]['y']+this[_0x430ede(0x1e4)]['height'];return new _0x31e003(_0x5132cb,_0x55b2c9,_0xe5cbb,_0x213b1d);}}return!![];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1b5)]=function(_0x57627c){const _0x87c32d=_0x3f7c0c,_0x2fce81=_0x57627c[_0x87c32d(0x4de)],_0x3bb8d2=VisuMZ['SkillsStatesCore'][_0x87c32d(0x517)];return _0x3bb8d2[_0x57627c['id']]?_0x3bb8d2[_0x57627c['id']][_0x87c32d(0x3da)](this,_0x57627c):!![];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1d6)]=function(_0x47783c){const _0x3d4b76=_0x3f7c0c;return VisuMZ[_0x3d4b76(0x209)][_0x3d4b76(0x4a7)][_0x3d4b76(0x24e)][_0x3d4b76(0x381)][_0x3d4b76(0x3da)](this,_0x47783c);},VisuMZ[_0x3f7c0c(0x209)]['Game_BattlerBase_skillMpCost']=Game_BattlerBase[_0x3f7c0c(0x3b6)]['skillMpCost'],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x426)]=function(_0x2d817a){const _0x1d6916=_0x3f7c0c;for(settings of VisuMZ[_0x1d6916(0x209)]['Settings'][_0x1d6916(0x503)]){if(settings['Name']['toUpperCase']()==='MP'){if(_0x1d6916(0x512)!==_0x1d6916(0x29f)){let _0x2ea722=settings[_0x1d6916(0x437)][_0x1d6916(0x3da)](this,_0x2d817a);return _0x2ea722=this['adjustSkillCost'](_0x2d817a,_0x2ea722,settings),_0x2ea722;}else this[_0x1d6916(0x1e9)](_0x852bf5,_0x90cce1['x']+_0x549bd4['width']-_0x46e1da,_0x4c0d6f['y'],_0x14613d);}}return VisuMZ[_0x1d6916(0x209)][_0x1d6916(0x41d)][_0x1d6916(0x3da)](this,_0x2d817a);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x40b)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x461)],Game_BattlerBase['prototype'][_0x3f7c0c(0x461)]=function(_0x24cd67){const _0x18000d=_0x3f7c0c;for(settings of VisuMZ[_0x18000d(0x209)][_0x18000d(0x4a7)]['Costs']){if(settings[_0x18000d(0x405)][_0x18000d(0x20a)]()==='TP'){let _0x3e132f=settings[_0x18000d(0x437)][_0x18000d(0x3da)](this,_0x24cd67);return _0x3e132f=this[_0x18000d(0x42f)](_0x24cd67,_0x3e132f,settings),_0x3e132f;}}return VisuMZ[_0x18000d(0x209)][_0x18000d(0x40b)][_0x18000d(0x3da)](this,_0x24cd67);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x281)]=function(_0x5d8838){const _0x5038d8=_0x3f7c0c;if(typeof _0x5d8838==='number')_0x5d8838=$dataStates[_0x5d8838];return this[_0x5038d8(0x4ee)]()['includes'](_0x5d8838);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x376)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4ee)],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4ee)]=function(){const _0x33aa7b=_0x3f7c0c;let _0x19d87a=VisuMZ[_0x33aa7b(0x209)][_0x33aa7b(0x376)][_0x33aa7b(0x3da)](this);if($gameTemp[_0x33aa7b(0x2c5)])return _0x19d87a;return $gameTemp[_0x33aa7b(0x2c5)]=!![],this['addPassiveStates'](_0x19d87a),$gameTemp[_0x33aa7b(0x2c5)]=undefined,_0x19d87a;},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x49c)]=function(_0x28b5d2){const _0x5b366a=_0x3f7c0c,_0x2499d1=this[_0x5b366a(0x275)]();for(state of _0x2499d1){if(!state)continue;if(!this[_0x5b366a(0x2d9)](state)&&_0x28b5d2['includes'](state))continue;_0x28b5d2[_0x5b366a(0x4c2)](state);}_0x2499d1[_0x5b366a(0x356)]>0x0&&_0x28b5d2[_0x5b366a(0x2b1)]((_0x5d06d8,_0x308f69)=>{const _0x180b59=_0x5b366a,_0x43b90d=_0x5d06d8[_0x180b59(0x2d5)],_0x193ebc=_0x308f69['priority'];if(_0x43b90d!==_0x193ebc)return _0x193ebc-_0x43b90d;return _0x5d06d8-_0x308f69;});},Game_BattlerBase[_0x3f7c0c(0x3b6)]['isPassiveStateStackable']=function(_0x29d7dc){const _0x3b38ce=_0x3f7c0c;return _0x29d7dc[_0x3b38ce(0x4de)][_0x3b38ce(0x238)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x43b)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x387)],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x387)]=function(_0x5e46f9){const _0x20b2d0=_0x3f7c0c;this[_0x20b2d0(0x46c)]=!![];let _0x38a055=VisuMZ[_0x20b2d0(0x209)][_0x20b2d0(0x43b)][_0x20b2d0(0x3da)](this,_0x5e46f9);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x38a055;},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x39b)]=function(){const _0x37177c=_0x3f7c0c;let _0x573b0f=[];this['_passiveStateResults']=this[_0x37177c(0x33c)]||{};for(;;){if(_0x37177c(0x3f2)==='IvMEs'){_0x573b0f=[];let _0x285a14=!![];for(const _0x557eaa of this[_0x37177c(0x2ef)][_0x37177c(0x275)]){if(_0x37177c(0x2c0)===_0x37177c(0x2c0)){const _0x445f21=$dataStates[_0x557eaa];if(!_0x445f21)continue;let _0x859e58=this['meetsPassiveStateConditions'](_0x445f21);if(this[_0x37177c(0x33c)][_0x557eaa]!==_0x859e58){if(_0x37177c(0x393)!==_0x37177c(0x393)){if(_0x2a14a6[_0x37177c(0x206)])this['addPassiveStatesTraitSets']();}else _0x285a14=![],this[_0x37177c(0x33c)][_0x557eaa]=_0x859e58;}if(!_0x859e58)continue;_0x573b0f[_0x37177c(0x4c2)](_0x445f21);}else{const _0x241f3f=0x0,_0x41e13f=this[_0x37177c(0x2a0)](),_0x4a2073=_0x785627[_0x37177c(0x20e)],_0x136d6a=this[_0x37177c(0x23a)]();return new _0x471155(_0x241f3f,_0x41e13f,_0x4a2073,_0x136d6a);}}if(_0x285a14)break;else{if(_0x37177c(0x3bc)===_0x37177c(0x3bc)){if(!this[_0x37177c(0x46c)])this['refresh']();this[_0x37177c(0x43e)]();}else{const _0x4cb64e=this[_0x37177c(0x2de)](_0x5f3cd4)[_0x37177c(0x43a)](_0xd68656=>this[_0x37177c(0x248)](_0xd68656['id']));return _0x4cb64e['length'];}}}else{const _0x5c9389=_0x375c8d[_0x37177c(0x209)],_0x5d747f=[_0x37177c(0x3ee),_0x37177c(0x34e),_0x37177c(0x2cf),_0x37177c(0x1d9),_0x37177c(0x4df),_0x37177c(0x352)];for(const _0x36d72d of _0x5d747f){_0x5c9389[_0x36d72d][_0x499c5f]&&_0x5c9389[_0x36d72d][_0x3d37b7][_0x37177c(0x3da)](this,_0x230793);}}}return _0x573b0f;},Game_BattlerBase[_0x3f7c0c(0x3b6)]['meetsPassiveStateConditions']=function(_0x29cb03){const _0x4ccb76=_0x3f7c0c;if(!this[_0x4ccb76(0x3cf)](_0x29cb03))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x29cb03))return![];if(!this[_0x4ccb76(0x442)](_0x29cb03))return![];if(!this[_0x4ccb76(0x4f3)](_0x29cb03))return![];return!![];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3cf)]=function(_0x18640a){return!![];},Game_Actor[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3cf)]=function(_0x100093){const _0x3d3e63=_0x3f7c0c,_0x5256bf=DataManager[_0x3d3e63(0x351)](_0x100093);if(_0x5256bf[_0x3d3e63(0x254)][_0x3d3e63(0x356)]>0x0){const _0x2a820e=_0x5256bf[_0x3d3e63(0x254)];if(!_0x2a820e[_0x3d3e63(0x486)](this[_0x3d3e63(0x254)]()))return![];}if(_0x5256bf[_0x3d3e63(0x28d)]['length']>0x0){if('cEspQ'!=='cEspQ'){if(this[_0x3d3e63(0x1f2)]||this[_0x3d3e63(0x488)])return;try{_0x1b7366[_0x3d3e63(0x209)][_0x3d3e63(0x4a7)][_0x3d3e63(0x1ea)][_0x3d3e63(0x234)][_0x3d3e63(0x3da)](this,_0x1f1419);}catch(_0x2e87ac){if(_0xdecfa5[_0x3d3e63(0x3a9)]())_0x427397[_0x3d3e63(0x4ff)](_0x2e87ac);}}else{const _0x9be7e2=_0x5256bf['multiClass'];let _0x24a7a8=[this[_0x3d3e63(0x254)]()];if(Imported['VisuMZ_2_ClassChangeSystem']&&this['multiclasses']){if(_0x3d3e63(0x41a)==='zWQRC')_0x24a7a8=this[_0x3d3e63(0x264)]();else return this[_0x3d3e63(0x49b)][_0x38585d]===-_0x22733d[_0x3d3e63(0x209)][_0x3d3e63(0x4a7)][_0x3d3e63(0x3b9)]['StackDebuffMax'];}if(_0x9be7e2['filter'](_0x1c916a=>_0x24a7a8[_0x3d3e63(0x486)](_0x1c916a))[_0x3d3e63(0x356)]<=0x0)return![];}}return Game_BattlerBase[_0x3d3e63(0x3b6)]['meetsPassiveStateConditionClasses'][_0x3d3e63(0x3da)](this,_0x100093);},DataManager['getPassiveStateConditionClassesData']=function(_0x496e12){const _0x40030b=_0x3f7c0c,_0x78d6a6={'currentClass':[],'multiClass':[]};if(!_0x496e12)return _0x78d6a6;this[_0x40030b(0x479)]=this[_0x40030b(0x479)]||{};if(this[_0x40030b(0x479)][_0x496e12['id']]!==undefined)return this[_0x40030b(0x479)][_0x496e12['id']];const _0x21fd8e=_0x496e12[_0x40030b(0x4de)]||'';if(_0x21fd8e[_0x40030b(0x238)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x385fa6=String(RegExp['$1'])['split'](',')['map'](_0x53c164=>_0x53c164[_0x40030b(0x4b1)]());_0x78d6a6[_0x40030b(0x254)]=VisuMZ[_0x40030b(0x209)][_0x40030b(0x24b)](_0x385fa6);}if(_0x21fd8e[_0x40030b(0x238)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0xe33280=String(RegExp['$1'])[_0x40030b(0x34d)](',')[_0x40030b(0x478)](_0x3b1c18=>_0x3b1c18[_0x40030b(0x4b1)]());_0x78d6a6[_0x40030b(0x28d)]=VisuMZ[_0x40030b(0x209)][_0x40030b(0x24b)](_0xe33280);}return this['_cache_getPassiveStateConditionClassesData'][_0x496e12['id']]=_0x78d6a6,this[_0x40030b(0x479)][_0x496e12['id']];},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x24b)]=function(_0x5882c2){const _0x569e78=_0x3f7c0c,_0x38d021=[];for(let _0x8297d2 of _0x5882c2){_0x8297d2=(String(_0x8297d2)||'')['trim']();const _0x3b5f4a=/^\d+$/['test'](_0x8297d2);_0x3b5f4a?_0x38d021['push'](Number(_0x8297d2)):_0x38d021['push'](DataManager[_0x569e78(0x518)](_0x8297d2));}return _0x38d021[_0x569e78(0x478)](_0x1da9e0=>$dataClasses[Number(_0x1da9e0)])[_0x569e78(0x28e)](null);},Game_BattlerBase[_0x3f7c0c(0x3b6)]['meetsPassiveStateConditionSwitches']=function(_0x450ab6){const _0xfb5cbc=_0x3f7c0c,_0x253f3b=DataManager[_0xfb5cbc(0x360)](_0x450ab6);if(_0x253f3b[_0xfb5cbc(0x39c)]&&_0x253f3b['allSwitchOn'][_0xfb5cbc(0x356)]>0x0){const _0x4573e7=_0x253f3b[_0xfb5cbc(0x39c)];for(const _0x21d45e of _0x4573e7){if(_0xfb5cbc(0x303)===_0xfb5cbc(0x303)){if(!$gameSwitches[_0xfb5cbc(0x4b6)](_0x21d45e))return![];}else{this[_0xfb5cbc(0x46c)]=!![];let _0x358549=_0x559a03['SkillsStatesCore'][_0xfb5cbc(0x43b)][_0xfb5cbc(0x3da)](this,_0x464fd5);return this['_checkingTraitsSetSkillsStatesCore']=_0x221898,_0x358549;}}}if(_0x253f3b[_0xfb5cbc(0x3be)]&&_0x253f3b[_0xfb5cbc(0x3be)][_0xfb5cbc(0x356)]>0x0){const _0xa7f353=_0x253f3b[_0xfb5cbc(0x3be)];let _0x278b3d=!![];for(const _0x411254 of _0xa7f353){if($gameSwitches[_0xfb5cbc(0x4b6)](_0x411254)){_0x278b3d=![];break;}}if(_0x278b3d)return![];}if(_0x253f3b[_0xfb5cbc(0x3e1)]&&_0x253f3b[_0xfb5cbc(0x3e1)][_0xfb5cbc(0x356)]>0x0){const _0x4b72b1=_0x253f3b[_0xfb5cbc(0x3e1)];for(const _0x3cd6fa of _0x4b72b1){if(_0xfb5cbc(0x2da)===_0xfb5cbc(0x1f4)){const _0x31f4d4=new _0xd2cc3c(0x0,0x0,_0x5df5ae['width'],_0x5473f4[_0xfb5cbc(0x1cc)]);this[_0xfb5cbc(0x44e)]=new _0x39f935(_0x31f4d4),this['_commandNameWindow'][_0xfb5cbc(0x1da)]=0x0,this['addChild'](this['_commandNameWindow']),this[_0xfb5cbc(0x357)]();}else{if($gameSwitches[_0xfb5cbc(0x4b6)](_0x3cd6fa))return![];}}}if(_0x253f3b[_0xfb5cbc(0x335)]&&_0x253f3b[_0xfb5cbc(0x335)][_0xfb5cbc(0x356)]>0x0){if(_0xfb5cbc(0x21f)==='ZZWAg')this[_0xfb5cbc(0x1e9)](_0xd703ac,_0x4326a8['x'],_0x3f5dcc['y'],_0x92c61c);else{const _0xc048ae=_0x253f3b[_0xfb5cbc(0x335)];let _0x48a676=!![];for(const _0x5c7373 of _0xc048ae){if(_0xfb5cbc(0x44f)!=='xQdJl'){if(!$gameSwitches[_0xfb5cbc(0x4b6)](_0x5c7373)){_0x48a676=![];break;}}else _0x40a05c[_0xfb5cbc(0x3f4)]-=this[_0xfb5cbc(0x386)]();}if(_0x48a676)return![];}}return!![];},DataManager[_0x3f7c0c(0x360)]=function(_0x95d50e){const _0x373464=_0x3f7c0c;let _0x12b6ce={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x95d50e)return _0x12b6ce;const _0x1ffa51=_0x95d50e['id'];this[_0x373464(0x1f9)]=this['_cache_getPassiveStateConditionSwitchData']||{};if(this[_0x373464(0x1f9)][_0x1ffa51]!==undefined)return this[_0x373464(0x1f9)][_0x1ffa51];const _0x7aa4d6=_0x95d50e['note']||'';_0x7aa4d6['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)/i)&&(_0x12b6ce['allSwitchOn']=String(RegExp['$1'])['split'](',')['map'](_0x4fd71c=>Number(_0x4fd71c)));_0x7aa4d6[_0x373464(0x238)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)/i)&&(_0x12b6ce[_0x373464(0x3be)]=String(RegExp['$1'])['split'](',')[_0x373464(0x478)](_0x431a8f=>Number(_0x431a8f)));if(_0x7aa4d6['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)/i)){if(_0x373464(0x29a)!==_0x373464(0x29a))return _0x47ec45[_0x373464(0x431)]()-0x2;else _0x12b6ce[_0x373464(0x3e1)]=String(RegExp['$1'])[_0x373464(0x34d)](',')[_0x373464(0x478)](_0x5bd038=>Number(_0x5bd038));}return _0x7aa4d6[_0x373464(0x238)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)/i)&&(_0x12b6ce['anySwitchOff']=String(RegExp['$1'])[_0x373464(0x34d)](',')[_0x373464(0x478)](_0x2865b1=>Number(_0x2865b1))),this['_cache_getPassiveStateConditionSwitchData'][_0x1ffa51]=_0x12b6ce,this['_cache_getPassiveStateConditionSwitchData'][_0x1ffa51];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x442)]=function(_0x5d75ef){const _0x3ab565=_0x3f7c0c,_0x7bc883=VisuMZ[_0x3ab565(0x209)][_0x3ab565(0x413)];if(_0x7bc883[_0x5d75ef['id']]&&!_0x7bc883[_0x5d75ef['id']][_0x3ab565(0x3da)](this,_0x5d75ef))return![];return!![];},Game_BattlerBase[_0x3f7c0c(0x3b6)]['meetsPassiveStateGlobalConditionJS']=function(_0x3ec8cf){const _0x553f81=_0x3f7c0c;return VisuMZ[_0x553f81(0x209)][_0x553f81(0x4a7)][_0x553f81(0x3bb)][_0x553f81(0x3c6)][_0x553f81(0x3da)](this,_0x3ec8cf);},Game_BattlerBase[_0x3f7c0c(0x3b6)]['passiveStates']=function(){const _0x302982=_0x3f7c0c;if(this[_0x302982(0x502)]('passiveStates'))return this[_0x302982(0x39b)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x302982(0x365)]=!![],this['createPassiveStatesCache'](),this[_0x302982(0x365)]=undefined,this[_0x302982(0x39b)]();},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x43e)]=function(){const _0x113b60=_0x3f7c0c;this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x113b60(0x2ef)][_0x113b60(0x275)]=[],this[_0x113b60(0x2ee)](),this['addPassiveStatesByNotetag'](),this['addPassiveStatesByPluginParameters'](),this[_0x113b60(0x2ef)][_0x113b60(0x275)]=this[_0x113b60(0x2ef)]['passiveStates'][_0x113b60(0x2b1)]((_0x52ea23,_0x5e6efc)=>_0x52ea23-_0x5e6efc),this[_0x113b60(0x365)]=undefined;},Game_BattlerBase['prototype'][_0x3f7c0c(0x2ee)]=function(){const _0x19d9cc=_0x3f7c0c;if(Imported['VisuMZ_1_ElementStatusCore'])this[_0x19d9cc(0x419)]();},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1d2)]=function(){return[];},Game_BattlerBase['prototype'][_0x3f7c0c(0x24d)]=function(){const _0x366faf=_0x3f7c0c,_0x4fedb3=this[_0x366faf(0x1d2)]();for(const _0x53b19b of _0x4fedb3){if(!_0x53b19b)continue;const _0x2479fa=DataManager[_0x366faf(0x332)](_0x53b19b);for(const _0x3f64b3 of _0x2479fa){if(_0x366faf(0x398)!==_0x366faf(0x398)){const _0x13d10c=_0x1b233c[_0x366faf(0x209)][_0x366faf(0x4a7)][_0x366faf(0x3bb)]['Global'];this[_0x366faf(0x2ef)][_0x366faf(0x275)]=this[_0x366faf(0x2ef)][_0x366faf(0x275)][_0x366faf(0x390)](_0x13d10c);}else this[_0x366faf(0x2ef)][_0x366faf(0x275)]['push'](_0x3f64b3);}}},DataManager['getPassiveStatesFromObj']=function(_0xc431a){const _0x44f667=_0x3f7c0c;if(!_0xc431a)return[];const _0x35d2e0=VisuMZ[_0x44f667(0x209)]['createKeyJS'](_0xc431a,_0x44f667(0x3ce));this[_0x44f667(0x449)]=this[_0x44f667(0x449)]||{};if(this[_0x44f667(0x449)][_0x35d2e0]!==undefined)return this[_0x44f667(0x449)][_0x35d2e0];const _0x16ecd6=[],_0x22f134=_0xc431a[_0x44f667(0x4de)]||'',_0x51a574=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x249a90=_0x22f134[_0x44f667(0x238)](_0x51a574);if(_0x249a90)for(const _0x1b549e of _0x249a90){_0x1b549e[_0x44f667(0x238)](_0x51a574);const _0x2253a4=String(RegExp['$1'])[_0x44f667(0x34d)](',')[_0x44f667(0x478)](_0x24342e=>_0x24342e[_0x44f667(0x4b1)]());for(const _0xd03d5d of _0x2253a4){if(_0x44f667(0x4c3)!=='yocUE')for(const _0x48d32f of _0x258c1c){let _0x223d10=0x0,_0x219b06=0x0;if(_0x48d32f[_0x44f667(0x238)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x223d10=_0x1919c8(_0x4a27ee['$1']),_0x219b06=_0x283a18(_0x5604a8['$2']);else _0x48d32f[_0x44f667(0x238)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x223d10=_0x1f9de0[_0x44f667(0x3ef)](_0x32be34['$1']),_0x219b06=_0x3bc9a0(_0xe64050['$2']));_0x439115[_0x44f667(0x233)](_0x223d10,_0x219b06),this['makeSuccess'](_0x2afb82);}else{const _0x1db7a5=/^\d+$/[_0x44f667(0x3a4)](_0xd03d5d);let _0x45fdaa=0x0;if(_0x1db7a5)_0x45fdaa=Number(_0xd03d5d);else{if(_0x44f667(0x280)!==_0x44f667(0x305))_0x45fdaa=DataManager[_0x44f667(0x3ef)](_0xd03d5d);else{const _0x1ddced=this[_0x44f667(0x49b)][_0xe507d4];return _0x4ea98d['SkillsStatesCore'][_0x44f667(0x4a7)]['Buffs'][_0x44f667(0x476)]['call'](this,_0x5db11c,_0x1ddced);}}if(_0x45fdaa){if(_0x44f667(0x46d)!==_0x44f667(0x468))_0x16ecd6[_0x44f667(0x4c2)](_0x45fdaa);else{const _0xe598c9=_0x581a3a['CoreEngine'][_0x44f667(0x4a7)][_0x44f667(0x4b0)]['DisplayedParams'],_0x332c6a=_0x48d77a[_0x44f667(0x3e9)](_0x419c0c/0x2)-0x18;let _0x3e7b13=_0x303682,_0x3c9111=_0x2d87e4[_0x44f667(0x3e9)]((this['innerHeight']-_0x390abc[_0x44f667(0x208)](_0xe598c9[_0x44f667(0x356)]/0x2)*_0x58c235)/0x2),_0x4cfb1a=0x0;for(const _0x389985 of _0xe598c9){this['drawExtendedParameter'](_0x3e7b13,_0x3c9111,_0x332c6a,_0x389985),_0x4cfb1a++,_0x4cfb1a%0x2===0x0?(_0x3e7b13=_0x399ac7,_0x3c9111+=_0x172d59):_0x3e7b13+=_0x332c6a+0x18;}}}}}}return this[_0x44f667(0x449)][_0x35d2e0]=_0x16ecd6,this[_0x44f667(0x449)][_0x35d2e0];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x22a)]=function(){const _0x3d9086=_0x3f7c0c,_0xb836fa=VisuMZ['SkillsStatesCore'][_0x3d9086(0x4a7)]['PassiveStates']['Global'];this[_0x3d9086(0x2ef)][_0x3d9086(0x275)]=this[_0x3d9086(0x2ef)][_0x3d9086(0x275)]['concat'](_0xb836fa);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2c7)]=function(_0x2e6a1c){const _0x11edb5=_0x3f7c0c;if(typeof _0x2e6a1c!==_0x11edb5(0x1d8))_0x2e6a1c=_0x2e6a1c['id'];return this[_0x11edb5(0x1b9)][_0x2e6a1c]||0x0;},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3f6)]=function(_0x52e665,_0x2630b2){const _0x3557c6=_0x3f7c0c;if(typeof _0x52e665!==_0x3557c6(0x1d8))_0x52e665=_0x52e665['id'];if(this[_0x3557c6(0x248)](_0x52e665)){if(_0x3557c6(0x224)===_0x3557c6(0x224)){const _0x110160=DataManager[_0x3557c6(0x417)](_0x52e665);this[_0x3557c6(0x1b9)][_0x52e665]=_0x2630b2[_0x3557c6(0x256)](0x0,_0x110160);if(this['_stateTurns'][_0x52e665]<=0x0)this['removeState'](_0x52e665);}else{_0x14a385[_0x3557c6(0x238)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x4654b1=_0x2355ec[_0x3557c6(0x1d0)](_0x258231(_0xefcec2['$1'])[_0x3557c6(0x20a)]()),_0x265166=_0x3751b7(_0x3c5c1e['$2']);_0x4654b1>=0x0&&(_0x111ba3[_0x3557c6(0x50d)](_0x4654b1,_0x265166),this[_0x3557c6(0x4c9)](_0x215a79));}}},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x233)]=function(_0x16e374,_0x5e99c2){const _0x3d4386=_0x3f7c0c;if(typeof _0x16e374!==_0x3d4386(0x1d8))_0x16e374=_0x16e374['id'];this[_0x3d4386(0x248)](_0x16e374)&&(_0x5e99c2+=this[_0x3d4386(0x2c7)](_0x16e374),this[_0x3d4386(0x3f6)](_0x16e374,_0x5e99c2));},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x235)]=Game_BattlerBase[_0x3f7c0c(0x3b6)]['eraseBuff'],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3fd)]=function(_0x3b1617){const _0x2ae333=_0x3f7c0c,_0x53b058=this[_0x2ae333(0x49b)][_0x3b1617];VisuMZ[_0x2ae333(0x209)][_0x2ae333(0x235)]['call'](this,_0x3b1617);if(_0x53b058>0x0)this[_0x2ae333(0x270)](_0x3b1617);if(_0x53b058<0x0)this[_0x2ae333(0x463)](_0x3b1617);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x496)]=Game_BattlerBase['prototype'][_0x3f7c0c(0x4d7)],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4d7)]=function(_0x4f14d0){const _0x5e87e7=_0x3f7c0c;VisuMZ[_0x5e87e7(0x209)][_0x5e87e7(0x496)][_0x5e87e7(0x3da)](this,_0x4f14d0);if(!this['isBuffOrDebuffAffected'](_0x4f14d0))this[_0x5e87e7(0x3fd)](_0x4f14d0);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x4b2)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4c8)],Game_BattlerBase[_0x3f7c0c(0x3b6)]['decreaseBuff']=function(_0x2f0163){const _0x147efa=_0x3f7c0c;VisuMZ[_0x147efa(0x209)][_0x147efa(0x4b2)][_0x147efa(0x3da)](this,_0x2f0163);if(!this[_0x147efa(0x4d3)](_0x2f0163))this[_0x147efa(0x3fd)](_0x2f0163);},Game_BattlerBase['prototype']['onEraseBuff']=function(_0x2bd5ce){},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x463)]=function(_0x214dbc){},Game_BattlerBase[_0x3f7c0c(0x3b6)]['isMaxBuffAffected']=function(_0x1edff0){const _0x380b2c=_0x3f7c0c;return this['_buffs'][_0x1edff0]===VisuMZ[_0x380b2c(0x209)][_0x380b2c(0x4a7)][_0x380b2c(0x3b9)][_0x380b2c(0x477)];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x391)]=function(_0x525842){const _0x27075c=_0x3f7c0c;return this['_buffs'][_0x525842]===-VisuMZ[_0x27075c(0x209)][_0x27075c(0x4a7)][_0x27075c(0x3b9)][_0x27075c(0x2af)];},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x401)]=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x327)],Game_BattlerBase['prototype'][_0x3f7c0c(0x327)]=function(_0x200e73,_0x4269b7){const _0x551259=_0x3f7c0c;return _0x200e73=_0x200e73[_0x551259(0x256)](-0x2,0x2),VisuMZ[_0x551259(0x209)][_0x551259(0x401)][_0x551259(0x3da)](this,_0x200e73,_0x4269b7);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2e1)]=function(_0x5264cd){const _0x108e3b=_0x3f7c0c,_0x419697=this['_buffs'][_0x5264cd];return VisuMZ[_0x108e3b(0x209)][_0x108e3b(0x4a7)][_0x108e3b(0x3b9)][_0x108e3b(0x476)][_0x108e3b(0x3da)](this,_0x5264cd,_0x419697);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x230)]=function(_0x1e09f8){const _0x42e96a=_0x3f7c0c;return this[_0x42e96a(0x334)][_0x1e09f8]||0x0;},Game_BattlerBase[_0x3f7c0c(0x3b6)]['debuffTurns']=function(_0x286292){const _0x5f2f37=_0x3f7c0c;return this[_0x5f2f37(0x230)](_0x286292);},Game_BattlerBase[_0x3f7c0c(0x3b6)]['setBuffTurns']=function(_0x211c57,_0x1ce32a){const _0x5f1902=_0x3f7c0c;if(this[_0x5f1902(0x4a5)](_0x211c57)){const _0x15d852=VisuMZ['SkillsStatesCore'][_0x5f1902(0x4a7)][_0x5f1902(0x3b9)][_0x5f1902(0x227)];this['_buffTurns'][_0x211c57]=_0x1ce32a[_0x5f1902(0x256)](0x0,_0x15d852);}},Game_BattlerBase['prototype']['addBuffTurns']=function(_0x12dbce,_0x44631b){const _0x3902c9=_0x3f7c0c;this[_0x3902c9(0x4a5)](_0x12dbce)&&(_0x44631b+=this[_0x3902c9(0x230)](stateId),this[_0x3902c9(0x3ad)](_0x12dbce,_0x44631b));},Game_BattlerBase['prototype'][_0x3f7c0c(0x2ce)]=function(_0x161be3,_0x2664a9){const _0x2d6c39=_0x3f7c0c;if(this[_0x2d6c39(0x2a7)](_0x161be3)){if(_0x2d6c39(0x42b)!==_0x2d6c39(0x42b)){const _0x41e237=this[_0x2d6c39(0x1ca)]();this['_shopStatusWindow']=new _0x39813c(_0x41e237),this[_0x2d6c39(0x42d)](this[_0x2d6c39(0x29c)]),this[_0x2d6c39(0x40c)]['setStatusWindow'](this[_0x2d6c39(0x29c)]);const _0x1658a9=_0x465885[_0x2d6c39(0x209)]['Settings'][_0x2d6c39(0x24e)]['SkillSceneStatusBgType'];this[_0x2d6c39(0x29c)][_0x2d6c39(0x30d)](_0x1658a9||0x0);}else{const _0x3eaf52=VisuMZ['SkillsStatesCore'][_0x2d6c39(0x4a7)][_0x2d6c39(0x3b9)][_0x2d6c39(0x227)];this[_0x2d6c39(0x334)][_0x161be3]=_0x2664a9[_0x2d6c39(0x256)](0x0,_0x3eaf52);}}},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x50d)]=function(_0x14397b,_0x1105a5){const _0x271faf=_0x3f7c0c;if(this['isDebuffAffected'](_0x14397b)){if(_0x271faf(0x2c8)==='QEsBC')return _0x19e1f5;else _0x1105a5+=this[_0x271faf(0x230)](stateId),this[_0x271faf(0x2ce)](_0x14397b,_0x1105a5);}},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4b9)]=function(_0x5a7e2a){const _0x48fe01=_0x3f7c0c;if(typeof _0x5a7e2a!==_0x48fe01(0x1d8))_0x5a7e2a=_0x5a7e2a['id'];return this[_0x48fe01(0x355)]=this['_stateData']||{},this[_0x48fe01(0x355)][_0x5a7e2a]=this[_0x48fe01(0x355)][_0x5a7e2a]||{},this[_0x48fe01(0x355)][_0x5a7e2a];},Game_BattlerBase['prototype'][_0x3f7c0c(0x345)]=function(_0x1d32b7,_0x4f05b9){if(typeof _0x1d32b7!=='number')_0x1d32b7=_0x1d32b7['id'];const _0x3db740=this['stateData'](_0x1d32b7);return _0x3db740[_0x4f05b9];},Game_BattlerBase['prototype'][_0x3f7c0c(0x499)]=function(_0x41824f,_0x288c6a,_0x3f1f73){const _0x3c8808=_0x3f7c0c;if(typeof _0x41824f!==_0x3c8808(0x1d8))_0x41824f=_0x41824f['id'];const _0x394863=this[_0x3c8808(0x4b9)](_0x41824f);_0x394863[_0x288c6a]=_0x3f1f73;},Game_BattlerBase['prototype'][_0x3f7c0c(0x3bd)]=function(_0x35d94b){const _0x1271ba=_0x3f7c0c;if(typeof _0x35d94b!==_0x1271ba(0x1d8))_0x35d94b=_0x35d94b['id'];this[_0x1271ba(0x355)]=this[_0x1271ba(0x355)]||{},this[_0x1271ba(0x355)][_0x35d94b]={};},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3b7)]=function(_0x1d671d){const _0x2e934d=_0x3f7c0c;if(typeof _0x1d671d!=='number')_0x1d671d=_0x1d671d['id'];this[_0x2e934d(0x3b3)]=this[_0x2e934d(0x3b3)]||{};if(this[_0x2e934d(0x3b3)][_0x1d671d]===undefined){if(_0x2e934d(0x3c2)!=='xzbLX')this[_0x2e934d(0x3b3)][_0x1d671d]='';else return[];}return this[_0x2e934d(0x3b3)][_0x1d671d];},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x429)]=function(_0x47b79c,_0x294cf3){const _0x8f760e=_0x3f7c0c;if(typeof _0x47b79c!=='number')_0x47b79c=_0x47b79c['id'];this[_0x8f760e(0x3b3)]=this[_0x8f760e(0x3b3)]||{},this[_0x8f760e(0x3b3)][_0x47b79c]=_0x294cf3;},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x261)]=function(_0x236eb7){const _0x25577d=_0x3f7c0c;if(typeof _0x236eb7!==_0x25577d(0x1d8))_0x236eb7=_0x236eb7['id'];this['_stateDisplay']=this['_stateDisplay']||{},this[_0x25577d(0x3b3)][_0x236eb7]='';},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x223)]=function(_0x4c7b80){const _0x4fabdd=_0x3f7c0c;if(typeof _0x4c7b80!==_0x4fabdd(0x1d8))_0x4c7b80=_0x4c7b80['id'];this[_0x4fabdd(0x31e)]=this[_0x4fabdd(0x31e)]||{},this[_0x4fabdd(0x31e)][_0x4c7b80]=this[_0x4fabdd(0x31e)][_0x4c7b80]||_0x4fabdd(0x21b);const _0x41a9fb=this[_0x4fabdd(0x31e)][_0x4c7b80];return this[_0x4fabdd(0x216)](_0x41a9fb);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4ac)]=function(_0x12e015,_0x4a66be){const _0x4809a2=_0x3f7c0c;this[_0x4809a2(0x31e)]=this[_0x4809a2(0x31e)]||{};const _0x2d6dd5=_0x4a66be?this['convertTargetToStateOriginKey'](_0x4a66be):this[_0x4809a2(0x35b)]();this[_0x4809a2(0x31e)][_0x12e015]=_0x2d6dd5;},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x367)]=function(_0x48b189){const _0x542751=_0x3f7c0c;this[_0x542751(0x31e)]=this[_0x542751(0x31e)]||{},delete this[_0x542751(0x31e)][_0x48b189];},Game_BattlerBase['prototype'][_0x3f7c0c(0x4bf)]=function(){const _0x40fdab=_0x3f7c0c;this[_0x40fdab(0x31e)]={};},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x35b)]=function(){const _0x1c1c17=this['getCurrentStateActiveUser']();return this['convertTargetToStateOriginKey'](_0x1c1c17);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x48c)]=function(){const _0x10eb26=_0x3f7c0c;if($gameParty[_0x10eb26(0x36d)]()){if(BattleManager[_0x10eb26(0x410)]){if(_0x10eb26(0x1ff)!==_0x10eb26(0x1ff))_0xe0b1f3[_0x10eb26(0x233)](_0xad032,_0x3e2721);else return BattleManager[_0x10eb26(0x410)];}else{if(BattleManager[_0x10eb26(0x279)]){if(_0x10eb26(0x392)!==_0x10eb26(0x255))return BattleManager[_0x10eb26(0x279)];else{const _0x4bc200=_0x2dc704[_0x10eb26(0x209)][_0x10eb26(0x323)]['call'](this);return _0x4bc200[_0x10eb26(0x256)](0x0,0x1);}}}}else{const _0x5ef809=SceneManager[_0x10eb26(0x39e)];if(![Scene_Map,Scene_Item]['includes'](_0x5ef809['constructor']))return $gameParty[_0x10eb26(0x1f6)]();}return this;},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x33e)]=function(_0x4703d4){const _0x3d069c=_0x3f7c0c;if(!_0x4703d4)return'user';if(_0x4703d4[_0x3d069c(0x403)]())return'<actor-%1>'[_0x3d069c(0x497)](_0x4703d4['actorId']());else{if(_0x3d069c(0x2cd)==='JTiLE'){const _0x4c7f4c=_0x3d069c(0x1c6)[_0x3d069c(0x497)](_0x4703d4[_0x3d069c(0x329)]()),_0x5e5fd2=_0x3d069c(0x4ae)[_0x3d069c(0x497)](_0x4703d4[_0x3d069c(0x50a)]()),_0x26f135=_0x3d069c(0x319)[_0x3d069c(0x497)]($gameTroop[_0x3d069c(0x1ac)]());return'%1\x20%2\x20%3'[_0x3d069c(0x497)](_0x4c7f4c,_0x5e5fd2,_0x26f135);}else return _0x563043[_0x1fc039['id']][_0x3d069c(0x3da)](this,_0x31336a);}return _0x3d069c(0x21b);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x216)]=function(_0x4925e5){const _0x436a6b=_0x3f7c0c;if(_0x4925e5===_0x436a6b(0x21b))return this;else{if(_0x4925e5[_0x436a6b(0x238)](/<actor-(\d+)>/i))return $gameActors['actor'](Number(RegExp['$1']));else{if(_0x436a6b(0x50b)!=='YhamW'){if(!_0x144696['isLearnedSkill'](_0x1c3ff3))return![];}else{if($gameParty[_0x436a6b(0x36d)]()&&_0x4925e5[_0x436a6b(0x238)](/<troop-(\d+)>/i)){const _0x394981=Number(RegExp['$1']);if(_0x394981===$gameTroop[_0x436a6b(0x1ac)]()){if(_0x436a6b(0x2a2)!=='HcjbX')_0x34249b(_0x436a6b(0x3e5)[_0x436a6b(0x497)](_0x262b50,_0x2d3112)),_0x1373ea[_0x436a6b(0x466)]();else{if(_0x4925e5['match'](/<member-(\d+)>/i)){if(_0x436a6b(0x3c7)!=='UuBqJ')return $gameTroop[_0x436a6b(0x1ed)]()[Number(RegExp['$1'])];else _0x5ebb17[_0x412530][_0x3ebed9][_0x436a6b(0x3da)](this,_0x529f9b);}}}}if(_0x4925e5[_0x436a6b(0x238)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}}return this;},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x3a3)]=Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x24c)],Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x24c)]=function(_0xbac042){const _0x450331=_0x3f7c0c,_0x31c80a=this[_0x450331(0x4d2)](_0xbac042);VisuMZ[_0x450331(0x209)][_0x450331(0x3a3)][_0x450331(0x3da)](this,_0xbac042);if(_0x31c80a&&this[_0x450331(0x281)]($dataStates[_0xbac042])){if(_0x450331(0x284)===_0x450331(0x284)){this[_0x450331(0x480)](_0xbac042);;}else for(const _0x280ba8 of _0x534680['categories']){if(this['isStateCategoryResisted'](_0x280ba8))return!![];}}},VisuMZ[_0x3f7c0c(0x209)]['Game_Battler_isStateAddable']=Game_Battler['prototype'][_0x3f7c0c(0x4d2)],Game_Battler[_0x3f7c0c(0x3b6)]['isStateAddable']=function(_0x24dc03){const _0x2e11e6=_0x3f7c0c,_0x57d3f5=$dataStates[_0x24dc03];if(_0x57d3f5&&_0x57d3f5[_0x2e11e6(0x4de)][_0x2e11e6(0x238)](/<NO DEATH CLEAR>/i)){if(_0x2e11e6(0x3a2)!=='PWjJN'){let _0x143a76=[this[_0x2e11e6(0x379)]()];return _0x143a76[_0x2e11e6(0x390)](this[_0x2e11e6(0x220)]());}else return!this[_0x2e11e6(0x483)](_0x24dc03)&&!this[_0x2e11e6(0x382)](_0x24dc03)&&!this[_0x2e11e6(0x4eb)][_0x2e11e6(0x4ba)](_0x24dc03);}return VisuMZ['SkillsStatesCore'][_0x2e11e6(0x1f1)][_0x2e11e6(0x3da)](this,_0x24dc03);},Game_Battler[_0x3f7c0c(0x3b6)]['onAddState']=function(_0xc6dc4d){const _0x2b79e3=_0x3f7c0c;this[_0x2b79e3(0x4ac)](_0xc6dc4d),this['removeOtherStatesOfSameCategory'](_0xc6dc4d),this[_0x2b79e3(0x1e1)](_0xc6dc4d),this[_0x2b79e3(0x1b3)](_0xc6dc4d),this[_0x2b79e3(0x371)](_0xc6dc4d);},Game_Battler[_0x3f7c0c(0x3b6)]['onRemoveState']=function(_0x319bd1){const _0xbe1d71=_0x3f7c0c;this[_0xbe1d71(0x218)](_0x319bd1),this['onEraseStateGlobalJS'](_0x319bd1),Game_BattlerBase[_0xbe1d71(0x3b6)][_0xbe1d71(0x259)]['call'](this,_0x319bd1);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4d5)]=function(_0x221088){const _0x8ae9dd=_0x3f7c0c;for(const _0x4058ee of this[_0x8ae9dd(0x4ee)]()){this[_0x8ae9dd(0x26f)](_0x4058ee['id'])&&_0x4058ee[_0x8ae9dd(0x3d4)]===_0x221088&&(this['removeState'](_0x4058ee['id']),this[_0x8ae9dd(0x337)](_0x4058ee['id']),this[_0x8ae9dd(0x47b)](_0x4058ee['id']));}},Game_Battler['prototype'][_0x3f7c0c(0x337)]=function(_0x1111cf){this['onExpireStateCustomJS'](_0x1111cf);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1b3)]=function(_0x9e838d){const _0x3914f2=_0x3f7c0c;if(this['_tempActor']||this[_0x3914f2(0x488)])return;const _0x49195d=VisuMZ[_0x3914f2(0x209)][_0x3914f2(0x22b)];if(_0x49195d[_0x9e838d])_0x49195d[_0x9e838d]['call'](this,_0x9e838d);},Game_Battler[_0x3f7c0c(0x3b6)]['onEraseStateCustomJS']=function(_0x2d2cd6){const _0x35aad4=_0x3f7c0c;if(this[_0x35aad4(0x1f2)]||this['_tempBattler'])return;const _0x181235=VisuMZ[_0x35aad4(0x209)][_0x35aad4(0x31d)];if(_0x181235[_0x2d2cd6])_0x181235[_0x2d2cd6][_0x35aad4(0x3da)](this,_0x2d2cd6);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1db)]=function(_0x197e81){const _0x53edf5=_0x3f7c0c;if(this[_0x53edf5(0x1f2)]||this[_0x53edf5(0x488)])return;const _0x2526a5=VisuMZ[_0x53edf5(0x209)][_0x53edf5(0x1b0)];if(_0x2526a5[_0x197e81])_0x2526a5[_0x197e81][_0x53edf5(0x3da)](this,_0x197e81);},Game_Battler[_0x3f7c0c(0x3b6)]['onAddStateGlobalJS']=function(_0x4508fc){const _0x35ba54=_0x3f7c0c;if(this[_0x35ba54(0x1f2)]||this[_0x35ba54(0x488)])return;try{if('gFiyJ'===_0x35ba54(0x328)){const _0x4b2e94=this['_buffs'][_0x3f9b71];_0x41eca7['SkillsStatesCore'][_0x35ba54(0x235)][_0x35ba54(0x3da)](this,_0x5902e2);if(_0x4b2e94>0x0)this[_0x35ba54(0x270)](_0x35a827);if(_0x4b2e94<0x0)this[_0x35ba54(0x463)](_0x16b4df);}else VisuMZ[_0x35ba54(0x209)]['Settings'][_0x35ba54(0x1ea)][_0x35ba54(0x210)]['call'](this,_0x4508fc);}catch(_0x230008){if(_0x35ba54(0x1c4)===_0x35ba54(0x333))this[_0x35ba54(0x1f3)](_0x19ff59['shift']());else{if($gameTemp['isPlaytest']())console[_0x35ba54(0x4ff)](_0x230008);}}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x215)]=function(_0x4bc734){const _0x43baf2=_0x3f7c0c;if(this[_0x43baf2(0x1f2)]||this['_tempBattler'])return;try{VisuMZ[_0x43baf2(0x209)][_0x43baf2(0x4a7)][_0x43baf2(0x1ea)][_0x43baf2(0x234)][_0x43baf2(0x3da)](this,_0x4bc734);}catch(_0x454bc3){if('vkLwd'===_0x43baf2(0x31c)){if(!_0x2ea10c)return _0x43baf2(0x21b);if(_0x191715[_0x43baf2(0x403)]())return _0x43baf2(0x4bc)[_0x43baf2(0x497)](_0x3a1db2[_0x43baf2(0x3db)]());else{const _0x5858e1=_0x43baf2(0x1c6)['format'](_0xf4d8f1[_0x43baf2(0x329)]()),_0x42618f=_0x43baf2(0x4ae)[_0x43baf2(0x497)](_0x2af791[_0x43baf2(0x50a)]()),_0x1f6a25=_0x43baf2(0x319)['format'](_0x1511a3[_0x43baf2(0x1ac)]());return _0x43baf2(0x1fc)[_0x43baf2(0x497)](_0x5858e1,_0x42618f,_0x1f6a25);}return _0x43baf2(0x21b);}else{if($gameTemp['isPlaytest']())console[_0x43baf2(0x4ff)](_0x454bc3);}}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x47b)]=function(_0x43e597){const _0x327b77=_0x3f7c0c;if(this['_tempActor']||this['_tempBattler'])return;try{if(_0x327b77(0x21a)!=='ICkkG')VisuMZ['SkillsStatesCore'][_0x327b77(0x4a7)][_0x327b77(0x1ea)]['onExpireStateJS'][_0x327b77(0x3da)](this,_0x43e597);else return _0x201e0c[_0x327b77(0x209)][_0x327b77(0x4a7)][_0x327b77(0x24e)][_0x327b77(0x26c)];}catch(_0x57c93b){if($gameTemp[_0x327b77(0x3a9)]())console['log'](_0x57c93b);}},Game_Battler[_0x3f7c0c(0x3b6)]['statesByCategory']=function(_0x45deb3){const _0xb08f85=_0x3f7c0c;return _0x45deb3=_0x45deb3[_0xb08f85(0x20a)]()[_0xb08f85(0x4b1)](),this[_0xb08f85(0x4ee)]()['filter'](_0x544081=>_0x544081[_0xb08f85(0x4e5)][_0xb08f85(0x486)](_0x45deb3));},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x32d)]=function(_0x12777a,_0x369968){const _0xada9b3=_0x3f7c0c;_0x12777a=_0x12777a[_0xada9b3(0x20a)]()[_0xada9b3(0x4b1)](),_0x369968=_0x369968||0x0;const _0x3a89af=this[_0xada9b3(0x2de)](_0x12777a),_0xe5f316=[];for(const _0x5ec233 of _0x3a89af){if(!_0x5ec233)continue;if(_0x369968<=0x0)break;_0xe5f316[_0xada9b3(0x4c2)](_0x5ec233['id']),this['_result'][_0xada9b3(0x1e3)]=!![],_0x369968--;}while(_0xe5f316[_0xada9b3(0x356)]>0x0){this['removeState'](_0xe5f316['shift']());}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x50c)]=function(_0x2088ee,_0x38ff24){const _0x32d86b=_0x3f7c0c;_0x2088ee=_0x2088ee['toUpperCase']()[_0x32d86b(0x4b1)](),_0x38ff24=_0x38ff24||[];const _0x13e8fb=this[_0x32d86b(0x2de)](_0x2088ee),_0x10eec6=[];for(const _0x5d22c6 of _0x13e8fb){if(!_0x5d22c6)continue;if(_0x38ff24[_0x32d86b(0x486)](_0x5d22c6))continue;_0x10eec6['push'](_0x5d22c6['id']),this[_0x32d86b(0x4eb)][_0x32d86b(0x1e3)]=!![];}while(_0x10eec6[_0x32d86b(0x356)]>0x0){this[_0x32d86b(0x1f3)](_0x10eec6[_0x32d86b(0x51a)]());}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4cd)]=function(_0x119e8a){const _0x5dfb5c=_0x3f7c0c;return this[_0x5dfb5c(0x282)](_0x119e8a)>0x0;},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x373)]=function(_0x20e8dc){const _0x583797=_0x3f7c0c;return this[_0x583797(0x1d4)](_0x20e8dc)>0x0;},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x282)]=function(_0x3c1bb0){const _0x366962=_0x3f7c0c,_0xdbd4d8=this[_0x366962(0x2de)](_0x3c1bb0)[_0x366962(0x43a)](_0x408e05=>this[_0x366962(0x248)](_0x408e05['id']));return _0xdbd4d8[_0x366962(0x356)];},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1d4)]=function(_0x3916c4){const _0x52184a=_0x3f7c0c,_0x50b0de=this[_0x52184a(0x2de)](_0x3916c4);return _0x50b0de['length'];},VisuMZ[_0x3f7c0c(0x209)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x483)],Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x483)]=function(_0x4c1c31){const _0x3f38a9=_0x3f7c0c,_0x357122=$dataStates[_0x4c1c31];if(_0x357122&&_0x357122[_0x3f38a9(0x4e5)][_0x3f38a9(0x356)]>0x0)for(const _0x16e60b of _0x357122[_0x3f38a9(0x4e5)]){if(this[_0x3f38a9(0x43f)](_0x16e60b))return!![];}return VisuMZ[_0x3f38a9(0x209)][_0x3f38a9(0x366)][_0x3f38a9(0x3da)](this,_0x4c1c31);},Game_BattlerBase[_0x3f7c0c(0x3b6)]['isStateCategoryResisted']=function(_0x4c97b5){const _0x5b171e=_0x3f7c0c;let _0x575ac4=_0x5b171e(0x203);if(this[_0x5b171e(0x502)](_0x575ac4))return this[_0x5b171e(0x2ef)][_0x575ac4][_0x5b171e(0x486)](_0x4c97b5);return this[_0x5b171e(0x2ef)][_0x575ac4]=this[_0x5b171e(0x3d1)](),this[_0x5b171e(0x2ef)][_0x575ac4][_0x5b171e(0x486)](_0x4c97b5);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3d1)]=function(){const _0xa6edbc=_0x3f7c0c,_0x2062be=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x339534=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x3bc57d=[];for(const _0x63eb31 of this['traitObjects']()){if(!_0x63eb31)continue;const _0x48b89d=_0x63eb31[_0xa6edbc(0x4de)],_0x3dc68d=_0x48b89d[_0xa6edbc(0x238)](_0x2062be);if(_0x3dc68d)for(const _0x176797 of _0x3dc68d){_0x176797[_0xa6edbc(0x238)](_0x2062be);const _0x1a3a66=String(RegExp['$1'])[_0xa6edbc(0x34d)](',')['map'](_0x1029de=>String(_0x1029de)[_0xa6edbc(0x20a)]()[_0xa6edbc(0x4b1)]());_0x3bc57d=_0x3bc57d[_0xa6edbc(0x390)](_0x1a3a66);}if(_0x48b89d[_0xa6edbc(0x238)](_0x339534)){if(_0xa6edbc(0x1f0)===_0xa6edbc(0x283)){_0x18f6f6[_0xa6edbc(0x209)]['Window_SkillStatus_refresh'][_0xa6edbc(0x3da)](this);if(this['_actor'])this[_0xa6edbc(0x1d1)]();}else{const _0x2c9f6e=String(RegExp['$1'])[_0xa6edbc(0x34d)](/[\r\n]+/)['map'](_0x2ed129=>String(_0x2ed129)[_0xa6edbc(0x20a)]()[_0xa6edbc(0x4b1)]());_0x3bc57d=_0x3bc57d[_0xa6edbc(0x390)](_0x2c9f6e);}}}return _0x3bc57d;},Game_BattlerBase['prototype']['removeOtherStatesOfSameCategory']=function(_0x2fb9fd){const _0x3e531a=_0x3f7c0c,_0x417b0d=$dataStates[_0x2fb9fd];if(!_0x417b0d)return;const _0xebbde9=_0x417b0d[_0x3e531a(0x4de)]||'',_0x11147b=_0xebbde9[_0x3e531a(0x238)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x11147b){const _0x5011ec=[_0x417b0d];for(const _0x33dfd5 of _0x11147b){_0x33dfd5[_0x3e531a(0x238)](/<REMOVE OTHER (.*) STATES>/i);const _0x56db0=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x56db0,_0x5011ec);}}},VisuMZ['SkillsStatesCore']['Game_Battler_addBuff']=Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x378)],Game_Battler[_0x3f7c0c(0x3b6)]['addBuff']=function(_0x141a71,_0x4d9e33){const _0x29c487=_0x3f7c0c;VisuMZ[_0x29c487(0x209)]['Game_Battler_addBuff'][_0x29c487(0x3da)](this,_0x141a71,_0x4d9e33);if(this[_0x29c487(0x4a5)](_0x141a71)){if(_0x29c487(0x3c3)!=='sVfYH')return this[_0x29c487(0x4b8)][_0x29c487(0x414)][_0x29c487(0x3da)](this[_0x29c487(0x2ac)]);else this['onAddBuff'](_0x141a71,_0x4d9e33);}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2a9)]=function(_0x490170){},VisuMZ['SkillsStatesCore']['Game_Battler_addDebuff']=Game_Battler['prototype']['addDebuff'],Game_Battler['prototype'][_0x3f7c0c(0x400)]=function(_0x28632a,_0x20adfc){const _0x4ff3de=_0x3f7c0c;VisuMZ['SkillsStatesCore'][_0x4ff3de(0x3b5)][_0x4ff3de(0x3da)](this,_0x28632a,_0x20adfc);if(this[_0x4ff3de(0x2a7)](_0x28632a)){if(_0x4ff3de(0x42e)===_0x4ff3de(0x340))return _0x42c3f6[_0x4ff3de(0x209)]['Settings'][_0x4ff3de(0x1ea)][_0x4ff3de(0x4fa)];else this[_0x4ff3de(0x495)](_0x28632a,_0x20adfc);}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3d9)]=function(){const _0x34dd8f=_0x3f7c0c;for(let _0x19781d=0x0;_0x19781d<this[_0x34dd8f(0x505)]();_0x19781d++){if(this['isBuffExpired'](_0x19781d)){const _0x28d9ee=this[_0x34dd8f(0x49b)][_0x19781d];this[_0x34dd8f(0x1eb)](_0x19781d);if(_0x28d9ee>0x0)this[_0x34dd8f(0x2f8)](_0x19781d);if(_0x28d9ee<0x0)this[_0x34dd8f(0x412)](_0x19781d);}}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x385)]=function(_0x5ac6a6,_0x5884e8){const _0x23db4b=_0x3f7c0c;this[_0x23db4b(0x4a4)](_0x5ac6a6,_0x5884e8);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x495)]=function(_0x154aa6,_0x2f16f4){const _0x7b6474=_0x3f7c0c;this[_0x7b6474(0x353)](_0x154aa6,_0x2f16f4);},Game_Battler[_0x3f7c0c(0x3b6)]['onEraseBuff']=function(_0x24b7ad){const _0xdbbdab=_0x3f7c0c;Game_BattlerBase[_0xdbbdab(0x3b6)][_0xdbbdab(0x270)]['call'](this,_0x24b7ad),this[_0xdbbdab(0x1c0)](_0x24b7ad);},Game_Battler['prototype'][_0x3f7c0c(0x463)]=function(_0x24e89a){const _0x2c8ca0=_0x3f7c0c;Game_BattlerBase['prototype']['onEraseDebuff'][_0x2c8ca0(0x3da)](this,_0x24e89a),this[_0x2c8ca0(0x40a)](_0x24e89a);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2f8)]=function(_0x3e881f){const _0x384131=_0x3f7c0c;this[_0x384131(0x425)](_0x3e881f);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x412)]=function(_0x4d2914){const _0x1f8128=_0x3f7c0c;this[_0x1f8128(0x23b)](_0x4d2914);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4a4)]=function(_0x32c576,_0x14ee8a){const _0x5baf16=_0x3f7c0c;VisuMZ[_0x5baf16(0x209)]['Settings'][_0x5baf16(0x3b9)][_0x5baf16(0x3c5)][_0x5baf16(0x3da)](this,_0x32c576,_0x14ee8a);},Game_Battler[_0x3f7c0c(0x3b6)]['onAddDebuffGlobalJS']=function(_0x36db7f,_0x312b48){const _0x2be411=_0x3f7c0c;VisuMZ[_0x2be411(0x209)]['Settings']['Buffs'][_0x2be411(0x48d)][_0x2be411(0x3da)](this,_0x36db7f,_0x312b48);},Game_BattlerBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1c0)]=function(_0xfb33bf){const _0x255af8=_0x3f7c0c;VisuMZ[_0x255af8(0x209)]['Settings']['Buffs']['onEraseBuffJS'][_0x255af8(0x3da)](this,_0xfb33bf);},Game_BattlerBase['prototype']['onEraseDebuffGlobalJS']=function(_0x3c76ad){const _0x182f92=_0x3f7c0c;VisuMZ[_0x182f92(0x209)][_0x182f92(0x4a7)][_0x182f92(0x3b9)]['onEraseDebuffJS']['call'](this,_0x3c76ad);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x425)]=function(_0x13d041){const _0x10f62f=_0x3f7c0c;VisuMZ[_0x10f62f(0x209)][_0x10f62f(0x4a7)]['Buffs']['onExpireBuffJS'][_0x10f62f(0x3da)](this,_0x13d041);},Game_Battler['prototype'][_0x3f7c0c(0x23b)]=function(_0xdf851f){const _0xd09882=_0x3f7c0c;VisuMZ[_0xd09882(0x209)][_0xd09882(0x4a7)][_0xd09882(0x3b9)][_0xd09882(0x3f3)]['call'](this,_0xdf851f);},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1e1)]=function(_0xcee098){const _0x31fc90=_0x3f7c0c,_0x3dc7e8=VisuMZ[_0x31fc90(0x209)],_0x32e6ce=['stateHpSlipDamageJS',_0x31fc90(0x34e),_0x31fc90(0x2cf),_0x31fc90(0x1d9),_0x31fc90(0x4df),'stateTpSlipHealJS'];for(const _0x3e306f of _0x32e6ce){if(_0x31fc90(0x38c)===_0x31fc90(0x38c))_0x3dc7e8[_0x3e306f][_0xcee098]&&_0x3dc7e8[_0x3e306f][_0xcee098][_0x31fc90(0x3da)](this,_0xcee098);else{if(!this[_0x31fc90(0x46c)])this[_0x31fc90(0x37b)]();this[_0x31fc90(0x43e)]();}}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x263)]=Game_Battler['prototype'][_0x3f7c0c(0x3e4)],Game_Battler['prototype'][_0x3f7c0c(0x3e4)]=function(){const _0x53670a=_0x3f7c0c;this[_0x53670a(0x204)](),VisuMZ[_0x53670a(0x209)]['Game_Battler_regenerateAll']['call'](this),this['setPassiveStateSlipDamageJS'](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3c0)]=function(){const _0x3e75c6=_0x3f7c0c;for(const _0xb598fc of this[_0x3e75c6(0x275)]()){if(_0x3e75c6(0x4c1)===_0x3e75c6(0x260)){if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['itemWindowRectSkillsStatesCore']();else{const _0x9c0fb8=_0x220f79[_0x3e75c6(0x209)]['Scene_Skill_itemWindowRect']['call'](this);return this[_0x3e75c6(0x1c9)]()&&this[_0x3e75c6(0x1c3)]()&&(_0x9c0fb8['width']-=this[_0x3e75c6(0x386)]()),_0x9c0fb8;}}else{if(!_0xb598fc)continue;this[_0x3e75c6(0x1e1)](_0xb598fc['id']);}}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x204)]=function(){const _0x43d00e=_0x3f7c0c;for(const _0x1b6acf of this[_0x43d00e(0x4ee)]()){if(!_0x1b6acf)continue;_0x1b6acf['note'][_0x43d00e(0x238)](/<JS SLIP REFRESH>/i)&&this['onAddStateMakeCustomSlipValues'](_0x1b6acf['id']);}},Game_Battler[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x49f)]=function(){const _0x44d069=_0x3f7c0c;if(!this[_0x44d069(0x325)]())return;const _0x2c6cea=this[_0x44d069(0x4ee)]();for(const _0x2bb2dc of _0x2c6cea){if(_0x44d069(0x513)!==_0x44d069(0x513)){if(this[_0x44d069(0x1f2)]||this[_0x44d069(0x488)])return;const _0x1547e1=_0x1de998[_0x44d069(0x209)]['stateAddJS'];if(_0x1547e1[_0x276798])_0x1547e1[_0x1a5c95][_0x44d069(0x3da)](this,_0xc1d32a);}else{if(!_0x2bb2dc)continue;this[_0x44d069(0x330)](_0x2bb2dc);}}},Game_Battler['prototype'][_0x3f7c0c(0x330)]=function(_0x40f928){const _0x360aa1=_0x3f7c0c,_0x1da474=this[_0x360aa1(0x345)](_0x40f928['id'],_0x360aa1(0x2d3))||0x0,_0x22372a=-this[_0x360aa1(0x27f)](),_0x12ca89=Math['max'](_0x1da474,_0x22372a);if(_0x12ca89!==0x0){const _0x111a98=this[_0x360aa1(0x4eb)][_0x360aa1(0x4be)]||0x0;this[_0x360aa1(0x1ec)](_0x12ca89),this[_0x360aa1(0x4eb)][_0x360aa1(0x4be)]+=_0x111a98;}const _0x2f6e00=this[_0x360aa1(0x345)](_0x40f928['id'],_0x360aa1(0x2fb))||0x0;if(_0x2f6e00!==0x0){const _0x1cc8be=this[_0x360aa1(0x4eb)][_0x360aa1(0x307)]||0x0;this[_0x360aa1(0x48a)](_0x2f6e00),this[_0x360aa1(0x4eb)]['mpDamage']+=_0x1cc8be;}const _0x494e4b=this[_0x360aa1(0x345)](_0x40f928['id'],_0x360aa1(0x2ca))||0x0;if(_0x494e4b!==0x0){if(_0x360aa1(0x4c4)===_0x360aa1(0x451)){_0x433281[_0x360aa1(0x209)][_0x360aa1(0x496)]['call'](this,_0x5926cd);if(!this[_0x360aa1(0x4d3)](_0x2b535e))this[_0x360aa1(0x3fd)](_0x1b9724);}else this['gainSilentTp'](_0x494e4b);}},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x484)]=Game_Actor['prototype'][_0x3f7c0c(0x1ab)],Game_Actor[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1ab)]=function(){const _0xe4e79=_0x3f7c0c,_0x4911a7=VisuMZ['SkillsStatesCore'][_0xe4e79(0x484)][_0xe4e79(0x3da)](this),_0x1c934d=VisuMZ['SkillsStatesCore'][_0xe4e79(0x4a7)][_0xe4e79(0x24e)];let _0x272269=_0x1c934d['HiddenSkillTypes'];return $gameParty[_0xe4e79(0x36d)]()&&(_0x272269=_0x272269[_0xe4e79(0x390)](_0x1c934d['BattleHiddenSkillTypes'])),_0x4911a7[_0xe4e79(0x43a)](_0x2d0f92=>!_0x272269['includes'](_0x2d0f92));},Game_Actor[_0x3f7c0c(0x3b6)]['usableSkills']=function(){const _0x6cf462=_0x3f7c0c;return this[_0x6cf462(0x220)]()[_0x6cf462(0x43a)](_0x489b03=>this[_0x6cf462(0x3f0)](_0x489b03));},Game_Actor['prototype'][_0x3f7c0c(0x3f0)]=function(_0x3d7851){const _0x59eafb=_0x3f7c0c;if(!this[_0x59eafb(0x1e5)](_0x3d7851))return![];if(!_0x3d7851)return![];if(!this[_0x59eafb(0x1e2)](_0x3d7851))return![];if(this['isSkillHidden'](_0x3d7851))return![];return!![];},Game_Actor['prototype']['isSkillTypeMatchForUse']=function(_0x26ab23){const _0x3e956d=_0x3f7c0c,_0x234f2a=this[_0x3e956d(0x1ab)](),_0x5635d5=DataManager[_0x3e956d(0x515)](_0x26ab23),_0x3a72a9=_0x234f2a['filter'](_0x5d75f1=>_0x5635d5[_0x3e956d(0x486)](_0x5d75f1));return _0x3a72a9['length']>0x0;},Game_Actor['prototype'][_0x3f7c0c(0x507)]=function(_0x4589c4){const _0xee0d6c=_0x3f7c0c;if(!VisuMZ[_0xee0d6c(0x209)]['CheckVisibleBattleNotetags'](this,_0x4589c4))return!![];if(!VisuMZ[_0xee0d6c(0x209)][_0xee0d6c(0x415)](this,_0x4589c4))return!![];if(!VisuMZ[_0xee0d6c(0x209)][_0xee0d6c(0x25e)](this,_0x4589c4))return!![];return![];},Game_Actor[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1d2)]=function(){const _0x545c66=_0x3f7c0c;let _0x33304e=[this[_0x545c66(0x326)](),this[_0x545c66(0x254)]()];_0x33304e=_0x33304e[_0x545c66(0x390)](this[_0x545c66(0x38a)]()['filter'](_0x3a6629=>_0x3a6629));for(const _0x4008bf of this[_0x545c66(0x2e7)]){if(_0x545c66(0x1b7)===_0x545c66(0x3d7))this[_0x545c66(0x49e)][_0x1b0416]=_0x545c66(0x237)[_0x545c66(0x497)](_0x38b536(_0x3d204d['$1']));else{const _0x29335e=$dataSkills[_0x4008bf];if(_0x29335e)_0x33304e[_0x545c66(0x4c2)](_0x29335e);}}return _0x33304e;},Game_Actor[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x22a)]=function(){const _0x377fdc=_0x3f7c0c;Game_Battler[_0x377fdc(0x3b6)][_0x377fdc(0x22a)][_0x377fdc(0x3da)](this);const _0xa9386f=VisuMZ[_0x377fdc(0x209)][_0x377fdc(0x4a7)][_0x377fdc(0x3bb)][_0x377fdc(0x402)];this[_0x377fdc(0x2ef)][_0x377fdc(0x275)]=this[_0x377fdc(0x2ef)][_0x377fdc(0x275)][_0x377fdc(0x390)](_0xa9386f);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x4b7)]=Game_Actor[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2b9)],Game_Actor['prototype'][_0x3f7c0c(0x2b9)]=function(_0x69ee74){const _0x13235e=_0x3f7c0c;VisuMZ[_0x13235e(0x209)]['Game_Actor_learnSkill']['call'](this,_0x69ee74),this[_0x13235e(0x2ef)]={},this[_0x13235e(0x275)]();},VisuMZ[_0x3f7c0c(0x209)]['Game_Actor_forgetSkill']=Game_Actor['prototype'][_0x3f7c0c(0x219)],Game_Actor['prototype'][_0x3f7c0c(0x219)]=function(_0x4ec8e2){const _0x2a0d82=_0x3f7c0c;VisuMZ['SkillsStatesCore'][_0x2a0d82(0x245)][_0x2a0d82(0x3da)](this,_0x4ec8e2),this['_cache']={},this['passiveStates']();},Game_Actor[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2e2)]=function(){const _0x3698f8=_0x3f7c0c;return VisuMZ[_0x3698f8(0x209)][_0x3698f8(0x4a7)]['States']['TurnEndOnMap']??0x14;},Game_Enemy['prototype']['passiveStateObjects']=function(){const _0x584042=_0x3f7c0c;let _0x531169=[this[_0x584042(0x379)]()];return _0x531169['concat'](this[_0x584042(0x220)]());},Game_Enemy[_0x3f7c0c(0x3b6)]['addPassiveStatesByPluginParameters']=function(){const _0x40e2de=_0x3f7c0c;Game_Battler['prototype']['addPassiveStatesByPluginParameters']['call'](this);const _0x41a334=VisuMZ['SkillsStatesCore']['Settings'][_0x40e2de(0x3bb)][_0x40e2de(0x2bd)];this[_0x40e2de(0x2ef)][_0x40e2de(0x275)]=this[_0x40e2de(0x2ef)][_0x40e2de(0x275)]['concat'](_0x41a334);},Game_Enemy[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x220)]=function(){const _0x5b32a5=_0x3f7c0c,_0x807995=[];for(const _0x2d318a of this[_0x5b32a5(0x379)]()[_0x5b32a5(0x1ef)]){const _0x3de41a=$dataSkills[_0x2d318a[_0x5b32a5(0x214)]];if(_0x3de41a&&!_0x807995[_0x5b32a5(0x486)](_0x3de41a))_0x807995[_0x5b32a5(0x4c2)](_0x3de41a);}return _0x807995;},Game_Enemy['prototype'][_0x3f7c0c(0x4f4)]=function(_0x205696){const _0x2ea91a=_0x3f7c0c;return this[_0x2ea91a(0x281)]($dataStates[_0x205696]);},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x4bd)]=Game_Unit[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x50f)],Game_Unit[_0x3f7c0c(0x3b6)]['isAllDead']=function(){const _0x377791=_0x3f7c0c;if(this[_0x377791(0x24a)]())return!![];return VisuMZ[_0x377791(0x209)]['Game_Unit_isAllDead'][_0x377791(0x3da)](this);},Game_Unit['prototype'][_0x3f7c0c(0x24a)]=function(){const _0x27d4e6=_0x3f7c0c,_0x179e79=this[_0x27d4e6(0x286)]();for(const _0x19a5c8 of _0x179e79){if(!_0x19a5c8['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x2ad)]=Game_Troop[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x359)],Game_Troop['prototype'][_0x3f7c0c(0x359)]=function(_0x41bc5b){const _0x257824=_0x3f7c0c;VisuMZ[_0x257824(0x209)][_0x257824(0x2ad)][_0x257824(0x3da)](this,_0x41bc5b),this[_0x257824(0x3e6)]();},Game_Troop[_0x3f7c0c(0x3b6)]['makeCurrentTroopUniqueID']=function(){const _0x141d74=_0x3f7c0c;this[_0x141d74(0x3ba)]=Graphics[_0x141d74(0x458)];},Game_Troop[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1ac)]=function(){const _0x3bf239=_0x3f7c0c;return this[_0x3bf239(0x3ba)]=this[_0x3bf239(0x3ba)]||Graphics[_0x3bf239(0x458)],this['_currentTroopUniqueID'];},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1b8)]=function(){const _0x5f4623=_0x3f7c0c;if(ConfigManager[_0x5f4623(0x1e8)]&&ConfigManager[_0x5f4623(0x37a)]!==undefined)return ConfigManager[_0x5f4623(0x37a)];else{if(this[_0x5f4623(0x441)]())return this[_0x5f4623(0x23e)]()[_0x5f4623(0x238)](/LOWER/i);else{if(_0x5f4623(0x213)===_0x5f4623(0x213))Scene_ItemBase[_0x5f4623(0x3b6)][_0x5f4623(0x310)][_0x5f4623(0x3da)](this);else return _0xf068fa[_0x5f4623(0x209)][_0x5f4623(0x4a7)][_0x5f4623(0x24e)][_0x5f4623(0x201)];}}},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x310)]=function(){const _0x232b20=_0x3f7c0c;if(ConfigManager[_0x232b20(0x1e8)]&&ConfigManager[_0x232b20(0x257)]!==undefined)return ConfigManager[_0x232b20(0x257)];else{if(this[_0x232b20(0x441)]())return _0x232b20(0x3fe)===_0x232b20(0x3fe)?this[_0x232b20(0x23e)]()[_0x232b20(0x238)](/RIGHT/i):_0x319b11['VisuMZ_1_ItemsEquipsCore']?_0xe4d42b[_0x232b20(0x3b6)][_0x232b20(0x346)]():0x0;else{if('GWtre'!==_0x232b20(0x348)){if(typeof _0x3f9357!=='number')_0x53bf4a=_0x3ddfc8['id'];this[_0x232b20(0x3b3)]=this[_0x232b20(0x3b3)]||{},this['_stateDisplay'][_0x290336]='';}else return Scene_ItemBase[_0x232b20(0x3b6)][_0x232b20(0x310)][_0x232b20(0x3da)](this);}}},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x23e)]=function(){const _0x165d52=_0x3f7c0c;return VisuMZ['SkillsStatesCore'][_0x165d52(0x4a7)]['Skills'][_0x165d52(0x467)];},Scene_Skill['prototype'][_0x3f7c0c(0x2bc)]=function(){const _0xd539a3=_0x3f7c0c;return this[_0xd539a3(0x4c6)]&&this[_0xd539a3(0x4c6)][_0xd539a3(0x2bc)]();},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x441)]=function(){const _0x106da2=_0x3f7c0c;return VisuMZ[_0x106da2(0x209)][_0x106da2(0x4a7)]['Skills'][_0x106da2(0x26c)];},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x4ef)]=Scene_Skill[_0x3f7c0c(0x3b6)]['helpWindowRect'],Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1c2)]=function(){const _0x1049af=_0x3f7c0c;return this[_0x1049af(0x441)]()?this['helpWindowRectSkillsStatesCore']():VisuMZ[_0x1049af(0x209)][_0x1049af(0x4ef)][_0x1049af(0x3da)](this);},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x462)]=function(){const _0x408186=_0x3f7c0c,_0x2208f9=0x0,_0x7df2cd=this[_0x408186(0x2a0)](),_0x875fa7=Graphics['boxWidth'],_0xe3941=this[_0x408186(0x23a)]();return new Rectangle(_0x2208f9,_0x7df2cd,_0x875fa7,_0xe3941);},VisuMZ[_0x3f7c0c(0x209)]['Scene_Skill_skillTypeWindowRect']=Scene_Skill['prototype'][_0x3f7c0c(0x445)],Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x445)]=function(){const _0x1525bc=_0x3f7c0c;return this[_0x1525bc(0x441)]()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x1525bc(0x209)][_0x1525bc(0x239)][_0x1525bc(0x3da)](this);},Scene_Skill[_0x3f7c0c(0x3b6)]['mainCommandWidth']=function(){const _0x100ce2=_0x3f7c0c;return VisuMZ[_0x100ce2(0x209)]['Settings'][_0x100ce2(0x24e)][_0x100ce2(0x45e)]??Scene_MenuBase[_0x100ce2(0x3b6)][_0x100ce2(0x2b7)][_0x100ce2(0x3da)](this);},Scene_Skill[_0x3f7c0c(0x3b6)]['skillTypeWindowRectSkillsStatesCore']=function(){const _0x4bfa54=_0x3f7c0c,_0x529ffc=this[_0x4bfa54(0x2b7)](),_0x58d3a5=this[_0x4bfa54(0x24f)](0x3,!![]),_0x3a4803=this['isRightInputMode']()?Graphics[_0x4bfa54(0x20e)]-_0x529ffc:0x0,_0x31fbad=this[_0x4bfa54(0x226)]();return new Rectangle(_0x3a4803,_0x31fbad,_0x529ffc,_0x58d3a5);},VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect']=Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2b0)],Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2b0)]=function(){const _0x523302=_0x3f7c0c;if(this[_0x523302(0x441)]())return this[_0x523302(0x1fa)]();else{if('begEh'!==_0x523302(0x273)){if(typeof _0xf91b82!==_0x523302(0x1d8))_0xbf9f01=_0x14b230['id'];const _0x5eea94=this[_0x523302(0x4b9)](_0x3b5789);return _0x5eea94[_0x2a08ec];}else return VisuMZ[_0x523302(0x209)][_0x523302(0x289)][_0x523302(0x3da)](this);}},Scene_Skill['prototype']['statusWindowRectSkillsStatesCore']=function(){const _0x454584=_0x3f7c0c,_0x4cc51b=Graphics['boxWidth']-this[_0x454584(0x2b7)](),_0x4fa33b=this[_0x454584(0x262)][_0x454584(0x1cc)],_0x32a6c4=this[_0x454584(0x310)]()?0x0:Graphics[_0x454584(0x20e)]-_0x4cc51b,_0x55a39a=this[_0x454584(0x226)]();return new Rectangle(_0x32a6c4,_0x55a39a,_0x4cc51b,_0x4fa33b);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x1b4)]=Scene_Skill['prototype']['createItemWindow'],Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x35f)]=function(){const _0x3bd3d3=_0x3f7c0c;VisuMZ['SkillsStatesCore'][_0x3bd3d3(0x1b4)]['call'](this);if(this[_0x3bd3d3(0x1c9)]()){if(_0x3bd3d3(0x32c)==='VaDQx'){if(typeof _0x329811!=='number')_0x154d7d=_0x1cf884['id'];this[_0x3bd3d3(0x355)]=this[_0x3bd3d3(0x355)]||{},this[_0x3bd3d3(0x355)][_0x1c9cd5]={};}else this[_0x3bd3d3(0x228)]();}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x42c)]=Scene_Skill['prototype'][_0x3f7c0c(0x3ff)],Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3ff)]=function(){const _0x412d25=_0x3f7c0c;if(this['isUseSkillsStatesCoreUpdatedLayout']())return _0x412d25(0x39f)!==_0x412d25(0x39f)?_0x9dc18a[_0x412d25(0x209)]['Settings'][_0x412d25(0x24e)][_0x412d25(0x467)]:this[_0x412d25(0x2ae)]();else{if(_0x412d25(0x297)!==_0x412d25(0x297))for(const _0x3aded5 of _0x20791a){_0x3aded5['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x23d7b2=_0x291da0(_0x261c6e['$1'])[_0x412d25(0x20a)]()[_0x412d25(0x4b1)]()[_0x412d25(0x34d)](',');for(const _0x31b66f of _0x23d7b2){_0x4b64a0[_0x412d25(0x4e5)][_0x412d25(0x4c2)](_0x31b66f[_0x412d25(0x4b1)]());}}else{const _0x5bad95=VisuMZ['SkillsStatesCore']['Scene_Skill_itemWindowRect'][_0x412d25(0x3da)](this);return this[_0x412d25(0x1c9)]()&&this[_0x412d25(0x1c3)]()&&(_0x412d25(0x358)===_0x412d25(0x32b)?(_0x440da7=_0x314187['getStateIdWithName'](_0x31a8f8['$1']),_0x799a1d=_0x241c11(_0x3878da['$2'])):_0x5bad95[_0x412d25(0x3f4)]-=this[_0x412d25(0x386)]()),_0x5bad95;}}},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2ae)]=function(){const _0x4f0d34=_0x3f7c0c,_0x2454f2=Graphics['boxWidth']-this['shopStatusWidth'](),_0x33c0ea=this['mainAreaHeight']()-this['_statusWindow'][_0x4f0d34(0x1cc)],_0x155bb9=this[_0x4f0d34(0x310)]()?Graphics[_0x4f0d34(0x20e)]-_0x2454f2:0x0,_0x443de6=this[_0x4f0d34(0x1e4)]['y']+this[_0x4f0d34(0x1e4)][_0x4f0d34(0x1cc)];return new Rectangle(_0x155bb9,_0x443de6,_0x2454f2,_0x33c0ea);},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1c9)]=function(){const _0x16946f=_0x3f7c0c;if(!Imported[_0x16946f(0x4ec)])return![];else return this[_0x16946f(0x441)]()?!![]:VisuMZ[_0x16946f(0x209)][_0x16946f(0x4a7)][_0x16946f(0x24e)][_0x16946f(0x201)];},Scene_Skill[_0x3f7c0c(0x3b6)]['adjustItemWidthByShopStatus']=function(){const _0x4b7622=_0x3f7c0c;return VisuMZ[_0x4b7622(0x209)][_0x4b7622(0x4a7)]['Skills']['SkillSceneAdjustSkillList'];},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x228)]=function(){const _0x2d9b3c=_0x3f7c0c,_0x2c08a8=this[_0x2d9b3c(0x1ca)]();this[_0x2d9b3c(0x29c)]=new Window_ShopStatus(_0x2c08a8),this['addWindow'](this[_0x2d9b3c(0x29c)]),this[_0x2d9b3c(0x40c)][_0x2d9b3c(0x395)](this[_0x2d9b3c(0x29c)]);const _0x343b4a=VisuMZ['SkillsStatesCore'][_0x2d9b3c(0x4a7)][_0x2d9b3c(0x24e)]['SkillSceneStatusBgType'];this[_0x2d9b3c(0x29c)]['setBackgroundType'](_0x343b4a||0x0);},Scene_Skill['prototype'][_0x3f7c0c(0x1ca)]=function(){const _0x46eed4=_0x3f7c0c;if(this[_0x46eed4(0x441)]())return this[_0x46eed4(0x40e)]();else{if(_0x46eed4(0x278)!==_0x46eed4(0x278))_0x41a949['SkillsStatesCore'][_0x46eed4(0x434)][_0x46eed4(0x3da)](this);else return VisuMZ['SkillsStatesCore'][_0x46eed4(0x4a7)]['Skills'][_0x46eed4(0x29e)][_0x46eed4(0x3da)](this);}},Scene_Skill[_0x3f7c0c(0x3b6)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x63d917=_0x3f7c0c,_0x2df143=this['shopStatusWidth'](),_0xecfca5=this[_0x63d917(0x40c)][_0x63d917(0x1cc)],_0x4ff7d8=this[_0x63d917(0x310)]()?0x0:Graphics['boxWidth']-this[_0x63d917(0x386)](),_0x134e33=this[_0x63d917(0x40c)]['y'];return new Rectangle(_0x4ff7d8,_0x134e33,_0x2df143,_0xecfca5);},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x386)]=function(){const _0xe5d87c=_0x3f7c0c;if(Imported['VisuMZ_1_ItemsEquipsCore']){if(_0xe5d87c(0x491)===_0xe5d87c(0x21c)){if(this[_0xe5d87c(0x502)](_0xe5d87c(0x275)))return this[_0xe5d87c(0x39b)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this['createPassiveStatesCache'](),this[_0xe5d87c(0x365)]=_0x55de32,this['convertPassiveStates']();}else return Scene_Shop['prototype'][_0xe5d87c(0x346)]();}else return 0x0;},Scene_Skill[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3dc)]=function(){const _0x1149b0=_0x3f7c0c;return this[_0x1149b0(0x262)]&&this[_0x1149b0(0x262)]['active']?_0x1149b0(0x350)==='ZXJWM'?TextManager['buttonAssistSwitch']:_0x457f88[_0x1149b0(0x2cc)]():'';},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x457)]=Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x433)],Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x433)]=function(){const _0x1315de=_0x3f7c0c;VisuMZ['SkillsStatesCore'][_0x1315de(0x457)][_0x1315de(0x3da)](this),this[_0x1315de(0x4b8)]=null;},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x2ff)]=Sprite_Gauge['prototype'][_0x3f7c0c(0x359)],Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x359)]=function(_0x13c42c,_0x10cffc){const _0x8eaf25=_0x3f7c0c;this['setupSkillsStatesCore'](_0x13c42c,_0x10cffc),_0x10cffc=_0x10cffc[_0x8eaf25(0x3cd)](),VisuMZ[_0x8eaf25(0x209)][_0x8eaf25(0x2ff)]['call'](this,_0x13c42c,_0x10cffc);},Sprite_Gauge['prototype'][_0x3f7c0c(0x2f7)]=function(_0xac4d3f,_0x19441a){const _0x50a4eb=_0x3f7c0c,_0x2b7423=VisuMZ[_0x50a4eb(0x209)][_0x50a4eb(0x4a7)]['Costs'][_0x50a4eb(0x43a)](_0x19722d=>_0x19722d[_0x50a4eb(0x405)][_0x50a4eb(0x20a)]()===_0x19441a[_0x50a4eb(0x20a)]());if(_0x2b7423[_0x50a4eb(0x356)]>=0x1){if('Cviuu'!==_0x50a4eb(0x342))this['_costSettings']=_0x2b7423[0x0];else{if(!_0x47387b['hasSkill'](_0x4183df))return!![];}}else this['_costSettings']=null;},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x447)]=Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x407)],Sprite_Gauge['prototype'][_0x3f7c0c(0x407)]=function(){const _0x53ac98=_0x3f7c0c;return this['_battler']&&this[_0x53ac98(0x4b8)]?this['currentValueSkillsStatesCore']():VisuMZ[_0x53ac98(0x209)]['Sprite_Gauge_currentValue']['call'](this);},Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4a1)]=function(){const _0xb9b39f=_0x3f7c0c;return this['_costSettings']['GaugeCurrentJS']['call'](this[_0xb9b39f(0x2ac)]);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x21d)]=Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x20f)],Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x20f)]=function(){const _0x23ebf3=_0x3f7c0c;return this[_0x23ebf3(0x2ac)]&&this[_0x23ebf3(0x4b8)]?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x23ebf3(0x209)][_0x23ebf3(0x21d)][_0x23ebf3(0x3da)](this);},Sprite_Gauge[_0x3f7c0c(0x3b6)]['currentMaxValueSkillsStatesCore']=function(){const _0x4d9450=_0x3f7c0c;return this[_0x4d9450(0x4b8)]['GaugeMaxJS'][_0x4d9450(0x3da)](this[_0x4d9450(0x2ac)]);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x323)]=Sprite_Gauge['prototype']['gaugeRate'],Sprite_Gauge['prototype'][_0x3f7c0c(0x1b2)]=function(){const _0x38d541=_0x3f7c0c,_0x49600b=VisuMZ[_0x38d541(0x209)][_0x38d541(0x323)][_0x38d541(0x3da)](this);return _0x49600b[_0x38d541(0x256)](0x0,0x1);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x434)]=Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3b8)],Sprite_Gauge['prototype'][_0x3f7c0c(0x3b8)]=function(){const _0x565801=_0x3f7c0c;if(this[_0x565801(0x2ac)]&&this[_0x565801(0x4b8)]){if(_0x565801(0x472)===_0x565801(0x408)){_0x3b8097['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x5067dd=_0x422e6a['indexOf'](_0x493005(_0x19d70f['$1'])[_0x565801(0x20a)]()),_0x3f1a16=_0x3de43f(_0x26cc9c['$2']);_0x5067dd>=0x0&&(_0x1375cf[_0x565801(0x3ad)](_0x5067dd,_0x3f1a16),this[_0x565801(0x4c9)](_0x33bfa9));}else this['bitmap'][_0x565801(0x2f2)](),this[_0x565801(0x21e)]();}else{if(_0x565801(0x511)===_0x565801(0x4f0))return this[_0x565801(0x377)]();else VisuMZ[_0x565801(0x209)][_0x565801(0x434)][_0x565801(0x3da)](this);}},Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x38e)]=function(){const _0xb7ce08=_0x3f7c0c;let _0x3b0ef7=this[_0xb7ce08(0x407)]();return Imported[_0xb7ce08(0x4fd)]&&this[_0xb7ce08(0x1e0)]()&&(_0x3b0ef7=VisuMZ[_0xb7ce08(0x31a)](_0x3b0ef7)),_0x3b0ef7;},Sprite_Gauge[_0x3f7c0c(0x3b6)]['redrawSkillsStatesCore']=function(){const _0x1a154f=_0x3f7c0c;this[_0x1a154f(0x36f)]['clear'](),this[_0x1a154f(0x4b8)][_0x1a154f(0x37d)][_0x1a154f(0x3da)](this);},Sprite_Gauge['prototype'][_0x3f7c0c(0x3c9)]=function(_0x2a904a,_0x2b4273,_0x3c6799,_0x1d8e65,_0x5c7dcd,_0x1b5862){const _0x109b6e=_0x3f7c0c,_0x471e74=this[_0x109b6e(0x1b2)](),_0x66eca6=Math[_0x109b6e(0x3e9)]((_0x5c7dcd-0x2)*_0x471e74),_0xf603d7=_0x1b5862-0x2,_0x4bf5ae=this['gaugeBackColor']();this['bitmap']['fillRect'](_0x3c6799,_0x1d8e65,_0x5c7dcd,_0x1b5862,_0x4bf5ae),this[_0x109b6e(0x36f)][_0x109b6e(0x1d3)](_0x3c6799+0x1,_0x1d8e65+0x1,_0x66eca6,_0xf603d7,_0x2a904a,_0x2b4273);},Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4f6)]=function(){const _0x159d6e=_0x3f7c0c,_0x2023dd=VisuMZ[_0x159d6e(0x209)]['Settings'][_0x159d6e(0x34f)];return _0x2023dd[_0x159d6e(0x314)]==='number'?$gameSystem[_0x159d6e(0x2cc)]():$gameSystem[_0x159d6e(0x1ee)]();},Sprite_Gauge[_0x3f7c0c(0x3b6)]['labelFontSize']=function(){const _0x22318c=_0x3f7c0c,_0x350ea6=VisuMZ[_0x22318c(0x209)][_0x22318c(0x4a7)]['Gauge'];if(_0x350ea6['LabelFontMainType']==='number')return $gameSystem[_0x22318c(0x431)]()-0x6;else{if(_0x22318c(0x4d0)!==_0x22318c(0x4d0))_0x5d799(_0x22318c(0x3a6)[_0x22318c(0x497)](_0x475863,_0x3adec1,_0x163a17)),_0x414262[_0x22318c(0x466)]();else return $gameSystem['mainFontSize']()-0x2;}},Sprite_Gauge['prototype'][_0x3f7c0c(0x516)]=function(){const _0xef8484=_0x3f7c0c,_0x575975=VisuMZ['SkillsStatesCore'][_0xef8484(0x4a7)]['Gauge'];if(_0x575975[_0xef8484(0x404)]==='number'){if(_0xef8484(0x43c)===_0xef8484(0x370))_0x8fa17e=![],this[_0xef8484(0x33c)][_0x474e70]=_0x4c03e5;else return $gameSystem[_0xef8484(0x2cc)]();}else{if(_0xef8484(0x363)===_0xef8484(0x363))return $gameSystem[_0xef8484(0x1ee)]();else{if(!this[_0xef8484(0x4ea)](_0x2cc078))return![];return!![];}}},Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3d2)]=function(){const _0x3f31d2=_0x3f7c0c,_0x139d52=VisuMZ[_0x3f31d2(0x209)]['Settings'][_0x3f31d2(0x34f)];if(_0x139d52['ValueFontMainType']===_0x3f31d2(0x1d8)){if('YNeCe'!=='BJhFe')return $gameSystem['mainFontSize']()-0x6;else{if(this['isDebuffAffected'](_0x360009)){const _0x4af751=_0x517bf9[_0x3f31d2(0x209)][_0x3f31d2(0x4a7)][_0x3f31d2(0x3b9)][_0x3f31d2(0x227)];this[_0x3f31d2(0x334)][_0x2fcf15]=_0x58e35e[_0x3f31d2(0x256)](0x0,_0x4af751);}}}else return $gameSystem[_0x3f31d2(0x431)]()-0x2;},Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x506)]=function(){const _0x3d99ea=_0x3f7c0c,_0xacc07d=VisuMZ['SkillsStatesCore']['Settings'][_0x3d99ea(0x34f)];if(_0xacc07d['MatchLabelColor']){if(_0x3d99ea(0x469)!==_0x3d99ea(0x2cb)){if(_0xacc07d[_0x3d99ea(0x471)]===0x1)return this[_0x3d99ea(0x300)]();else{if(_0xacc07d[_0x3d99ea(0x471)]===0x2){if('PYPHn'!==_0x3d99ea(0x212))return this[_0x3d99ea(0x377)]();else{this[_0x3d99ea(0x1bf)](),this[_0x3d99ea(0x30b)][_0x3d99ea(0x2f2)]();const _0x149caa=this['_battler'];if(!_0x149caa)return;const _0x57b872=_0x149caa[_0x3d99ea(0x4ee)]()[_0x3d99ea(0x43a)](_0x4f5635=>_0x4f5635[_0x3d99ea(0x27e)]>0x0),_0x5740a5=[..._0x252e40(0x8)['keys']()]['filter'](_0x34be8a=>_0x149caa[_0x3d99ea(0x475)](_0x34be8a)!==0x0),_0x3f58ce=this[_0x3d99ea(0x2eb)],_0x38da96=_0x57b872[_0x3f58ce];if(_0x38da96)_0x3dd19b[_0x3d99ea(0x3b6)]['drawActorStateTurns'][_0x3d99ea(0x3da)](this,_0x149caa,_0x38da96,0x0,0x0),_0x303cf1[_0x3d99ea(0x3b6)][_0x3d99ea(0x4db)][_0x3d99ea(0x3da)](this,_0x149caa,_0x38da96,0x0,0x0);else{const _0x222b0f=_0x5740a5[_0x3f58ce-_0x57b872['length']];if(_0x222b0f===_0x37d9ce)return;_0x3d5193[_0x3d99ea(0x3b6)]['drawActorBuffTurns'][_0x3d99ea(0x3da)](this,_0x149caa,_0x222b0f,0x0,0x0),_0x24c67f[_0x3d99ea(0x3b6)][_0x3d99ea(0x42a)][_0x3d99ea(0x3da)](this,_0x149caa,_0x222b0f,0x0,0x0);}}}}}else _0x2ece58=_0x28efee['getStateIdWithName'](_0x388470['$1']),_0x20b797=_0x2f4645(_0x505fe5['$2']);}const _0x1f259e=_0xacc07d[_0x3d99ea(0x31b)];return ColorManager[_0x3d99ea(0x4e1)](_0x1f259e);},Sprite_Gauge[_0x3f7c0c(0x3b6)]['labelOutlineColor']=function(){const _0x27d688=_0x3f7c0c,_0x47c16e=VisuMZ['SkillsStatesCore']['Settings'][_0x27d688(0x34f)];if(this[_0x27d688(0x494)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else{if(_0x47c16e[_0x27d688(0x380)]){if('UnMgA'!=='UnMgA'){if(_0x405020[_0x27d688(0x3a9)]())_0x361520[_0x27d688(0x4ff)](_0x461b58);}else return _0x27d688(0x40d);}else return ColorManager[_0x27d688(0x1d7)]();}},Sprite_Gauge[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x494)]=function(){const _0x1e99c1=_0x3f7c0c;return VisuMZ['SkillsStatesCore'][_0x1e99c1(0x4a7)][_0x1e99c1(0x34f)]['LabelOutlineWidth']||0x0;},Sprite_Gauge[_0x3f7c0c(0x3b6)]['valueOutlineColor']=function(){const _0x406404=_0x3f7c0c,_0x428aa0=VisuMZ['SkillsStatesCore'][_0x406404(0x4a7)]['Gauge'];if(this[_0x406404(0x274)]()<=0x0)return _0x406404(0x3c4);else return _0x428aa0[_0x406404(0x48b)]?_0x406404(0x40d):ColorManager[_0x406404(0x1d7)]();},Sprite_Gauge[_0x3f7c0c(0x3b6)]['valueOutlineWidth']=function(){const _0x2a281c=_0x3f7c0c;return VisuMZ['SkillsStatesCore'][_0x2a281c(0x4a7)][_0x2a281c(0x34f)]['ValueOutlineWidth']||0x0;},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x217)]=Sprite_StateIcon[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x422)],Sprite_StateIcon['prototype'][_0x3f7c0c(0x422)]=function(){const _0x28e38e=_0x3f7c0c;VisuMZ[_0x28e38e(0x209)][_0x28e38e(0x217)]['call'](this),this['createTurnDisplaySprite']();},Sprite_StateIcon['prototype'][_0x3f7c0c(0x424)]=function(){const _0x591658=_0x3f7c0c,_0x4b39ef=Window_Base['prototype'][_0x591658(0x27b)]();this['_turnDisplaySprite']=new Sprite(),this['_turnDisplaySprite'][_0x591658(0x36f)]=new Bitmap(ImageManager[_0x591658(0x249)],_0x4b39ef),this[_0x591658(0x44b)][_0x591658(0x32a)]['x']=this[_0x591658(0x32a)]['x'],this[_0x591658(0x44b)][_0x591658(0x32a)]['y']=this[_0x591658(0x32a)]['y'],this[_0x591658(0x4e9)](this[_0x591658(0x44b)]),this[_0x591658(0x30b)]=this[_0x591658(0x44b)]['bitmap'];},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x26e)]=Sprite_StateIcon[_0x3f7c0c(0x3b6)]['updateFrame'],Sprite_StateIcon[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x416)]=function(){const _0x3764ca=_0x3f7c0c;VisuMZ['SkillsStatesCore'][_0x3764ca(0x26e)][_0x3764ca(0x3da)](this),this[_0x3764ca(0x291)]();},Sprite_StateIcon[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3ca)]=function(_0x30b050,_0x59cbaf,_0x398621,_0x4bfeed,_0x118ea6){const _0x9dcce6=_0x3f7c0c;this['contents'][_0x9dcce6(0x3ca)](_0x30b050,_0x59cbaf,_0x398621,_0x4bfeed,this[_0x9dcce6(0x30b)][_0x9dcce6(0x1cc)],_0x118ea6);},Sprite_StateIcon[_0x3f7c0c(0x3b6)]['updateTurnDisplaySprite']=function(){const _0x28a05b=_0x3f7c0c;this[_0x28a05b(0x1bf)](),this[_0x28a05b(0x30b)][_0x28a05b(0x2f2)]();const _0x4c6ca0=this[_0x28a05b(0x2ac)];if(!_0x4c6ca0)return;const _0xcb61da=_0x4c6ca0['states']()[_0x28a05b(0x43a)](_0x20a8ce=>_0x20a8ce['iconIndex']>0x0),_0x3c7505=[...Array(0x8)[_0x28a05b(0x293)]()][_0x28a05b(0x43a)](_0x1d3314=>_0x4c6ca0[_0x28a05b(0x475)](_0x1d3314)!==0x0),_0x50be2e=this[_0x28a05b(0x2eb)],_0x15a538=_0xcb61da[_0x50be2e];if(_0x15a538)_0x28a05b(0x23d)!=='wpfDT'?this[_0x28a05b(0x4a4)](_0x271f25,_0x46f6e6):(Window_Base[_0x28a05b(0x3b6)][_0x28a05b(0x3c8)][_0x28a05b(0x3da)](this,_0x4c6ca0,_0x15a538,0x0,0x0),Window_Base['prototype'][_0x28a05b(0x4db)][_0x28a05b(0x3da)](this,_0x4c6ca0,_0x15a538,0x0,0x0));else{const _0x17d69b=_0x3c7505[_0x50be2e-_0xcb61da['length']];if(_0x17d69b===undefined)return;Window_Base['prototype'][_0x28a05b(0x244)][_0x28a05b(0x3da)](this,_0x4c6ca0,_0x17d69b,0x0,0x0),Window_Base[_0x28a05b(0x3b6)][_0x28a05b(0x42a)][_0x28a05b(0x3da)](this,_0x4c6ca0,_0x17d69b,0x0,0x0);}},Sprite_StateIcon['prototype'][_0x3f7c0c(0x1bf)]=function(){const _0x407eea=_0x3f7c0c;this[_0x407eea(0x30b)][_0x407eea(0x4a8)]=$gameSystem[_0x407eea(0x1ee)](),this[_0x407eea(0x30b)][_0x407eea(0x2ec)]=$gameSystem['mainFontSize'](),this[_0x407eea(0x26a)]();},Sprite_StateIcon['prototype']['resetTextColor']=function(){const _0x220859=_0x3f7c0c;this[_0x220859(0x1be)](ColorManager[_0x220859(0x28f)]()),this[_0x220859(0x20d)](ColorManager[_0x220859(0x1d7)]());},Sprite_StateIcon[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1be)]=function(_0x2507ae){const _0x4accdf=_0x3f7c0c;this[_0x4accdf(0x30b)][_0x4accdf(0x240)]=_0x2507ae;},Sprite_StateIcon['prototype'][_0x3f7c0c(0x20d)]=function(_0x12c7bb){const _0x1c5475=_0x3f7c0c;this[_0x1c5475(0x30b)][_0x1c5475(0x1d7)]=_0x12c7bb;},Sprite_StateIcon[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x45b)]=function(){const _0x57e85f=_0x3f7c0c;this['_hidden']=!![],this[_0x57e85f(0x2ba)]();},Window_Base['prototype'][_0x3f7c0c(0x47d)]=function(_0x3f13db,_0x59e16f,_0x4a1801,_0x21c95b,_0x1b03a1){const _0x45bb6=_0x3f7c0c,_0x3d098e=this[_0x45bb6(0x229)](_0x3f13db,_0x59e16f),_0x3b13ef=this['textSizeEx'](_0x3d098e,_0x4a1801,_0x21c95b,_0x1b03a1),_0x45f8d4=_0x4a1801+_0x1b03a1-_0x3b13ef[_0x45bb6(0x3f4)];this[_0x45bb6(0x1e9)](_0x3d098e,_0x45f8d4,_0x21c95b,_0x1b03a1),this[_0x45bb6(0x1bf)]();},Window_Base['prototype']['createAllSkillCostText']=function(_0x44848a,_0x16f376){const _0x4c4dc1=_0x3f7c0c;let _0x45a50d='';for(settings of VisuMZ[_0x4c4dc1(0x209)]['Settings'][_0x4c4dc1(0x503)]){if(_0x4c4dc1(0x435)!==_0x4c4dc1(0x4f1)){if(!this[_0x4c4dc1(0x4f7)](_0x44848a,_0x16f376,settings))continue;if(_0x45a50d[_0x4c4dc1(0x356)]>0x0)_0x45a50d+=this[_0x4c4dc1(0x459)]();_0x45a50d+=this[_0x4c4dc1(0x4e6)](_0x44848a,_0x16f376,settings);}else{const _0x131591=_0x298e77['SkillsStatesCore'][_0x4c4dc1(0x4a7)][_0x4c4dc1(0x1ea)];if(!_0x131591)return;if(_0x131591[_0x4c4dc1(0x37c)]===![])return;if(!this[_0x4c4dc1(0x410)])return;this['_subject'][_0x4c4dc1(0x272)]();}}_0x45a50d=this[_0x4c4dc1(0x3dd)](_0x44848a,_0x16f376,_0x45a50d);if(_0x16f376[_0x4c4dc1(0x4de)][_0x4c4dc1(0x238)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x4c4dc1(0x258)!=='ePkSw')return _0x1d7b0e[_0x4c4dc1(0x1f6)]();else{if(_0x45a50d[_0x4c4dc1(0x356)]>0x0)_0x45a50d+=this[_0x4c4dc1(0x459)]();_0x45a50d+=String(RegExp['$1']);}}return _0x45a50d;},Window_Base[_0x3f7c0c(0x3b6)]['makeAdditionalSkillCostText']=function(_0x407923,_0x72e2a8,_0x1fc6b2){return _0x1fc6b2;},Window_Base[_0x3f7c0c(0x3b6)]['isSkillCostShown']=function(_0x518a8f,_0x18cf61,_0x961673){const _0x304e00=_0x3f7c0c;let _0x2bbfb5=_0x961673['CalcJS'][_0x304e00(0x3da)](_0x518a8f,_0x18cf61);return _0x2bbfb5=_0x518a8f[_0x304e00(0x42f)](_0x18cf61,_0x2bbfb5,_0x961673),_0x961673[_0x304e00(0x2fd)][_0x304e00(0x3da)](_0x518a8f,_0x18cf61,_0x2bbfb5,_0x961673);},Window_Base['prototype'][_0x3f7c0c(0x4e6)]=function(_0x36b074,_0x34e147,_0x261325){const _0xba9c6b=_0x3f7c0c;let _0x1aacd2=_0x261325[_0xba9c6b(0x437)][_0xba9c6b(0x3da)](_0x36b074,_0x34e147);return _0x1aacd2=_0x36b074[_0xba9c6b(0x42f)](_0x34e147,_0x1aacd2,_0x261325),_0x261325[_0xba9c6b(0x232)][_0xba9c6b(0x3da)](_0x36b074,_0x34e147,_0x1aacd2,_0x261325);},Window_Base['prototype']['skillCostSeparator']=function(){return'\x20';},Window_Base[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2ea)]=function(_0x546612,_0x440925,_0x2e07e7,_0x2b9ffc){const _0xa54ae0=_0x3f7c0c;if(!_0x546612)return;VisuMZ[_0xa54ae0(0x209)][_0xa54ae0(0x321)][_0xa54ae0(0x3da)](this,_0x546612,_0x440925,_0x2e07e7,_0x2b9ffc),this[_0xa54ae0(0x47c)](_0x546612,_0x440925,_0x2e07e7,_0x2b9ffc);},Window_Base[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x47c)]=function(_0x502901,_0x56e2ae,_0x11952c,_0x29884c){const _0x240ef6=_0x3f7c0c;_0x29884c=_0x29884c||0x90;const _0x179213=ImageManager[_0x240ef6(0x249)],_0x350160=_0x502901['allIcons']()['slice'](0x0,Math[_0x240ef6(0x3e9)](_0x29884c/_0x179213)),_0x16adf0=_0x502901[_0x240ef6(0x4ee)]()[_0x240ef6(0x43a)](_0x8b1df0=>_0x8b1df0[_0x240ef6(0x27e)]>0x0),_0x424c90=[...Array(0x8)[_0x240ef6(0x293)]()][_0x240ef6(0x43a)](_0x79d05f=>_0x502901[_0x240ef6(0x475)](_0x79d05f)!==0x0),_0x4e52d1=[];let _0x5a7af6=_0x56e2ae;for(let _0x499cbc=0x0;_0x499cbc<_0x350160['length'];_0x499cbc++){this[_0x240ef6(0x1bf)]();const _0x2896de=_0x16adf0[_0x499cbc];if(_0x2896de){if(_0x240ef6(0x492)===_0x240ef6(0x492)){if(!_0x4e52d1[_0x240ef6(0x486)](_0x2896de)){if(_0x240ef6(0x251)===_0x240ef6(0x251))this[_0x240ef6(0x3c8)](_0x502901,_0x2896de,_0x5a7af6,_0x11952c);else return _0x26ccb6['SkillsStatesCore'][_0x240ef6(0x4a7)][_0x240ef6(0x34f)][_0x240ef6(0x25b)]||0x0;}this[_0x240ef6(0x4db)](_0x502901,_0x2896de,_0x5a7af6,_0x11952c),_0x4e52d1[_0x240ef6(0x4c2)](_0x2896de);}else return _0x52cbd0[_0x240ef6(0x209)][_0x240ef6(0x4a7)][_0x240ef6(0x24e)][_0x240ef6(0x381)][_0x240ef6(0x3da)](this,_0x4c1e3d);}else{const _0x5d1dc5=_0x424c90[_0x499cbc-_0x16adf0[_0x240ef6(0x356)]];this[_0x240ef6(0x244)](_0x502901,_0x5d1dc5,_0x5a7af6,_0x11952c),this[_0x240ef6(0x42a)](_0x502901,_0x5d1dc5,_0x5a7af6,_0x11952c);}_0x5a7af6+=_0x179213;}},Window_Base[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3c8)]=function(_0x10a88b,_0x35f46a,_0x58aa2a,_0x31fe92){const _0x4ea7cd=_0x3f7c0c;if(!VisuMZ[_0x4ea7cd(0x209)][_0x4ea7cd(0x4a7)][_0x4ea7cd(0x1ea)][_0x4ea7cd(0x3df)])return;if(!_0x10a88b['isStateAffected'](_0x35f46a['id']))return;if(_0x35f46a[_0x4ea7cd(0x3d4)]===0x0)return;if(_0x35f46a['note'][_0x4ea7cd(0x238)](/<HIDE STATE TURNS>/i))return;const _0x2fc652=_0x10a88b[_0x4ea7cd(0x2c7)](_0x35f46a['id']),_0x49a89c=ImageManager[_0x4ea7cd(0x249)],_0x28dc95=ColorManager[_0x4ea7cd(0x312)](_0x35f46a);this[_0x4ea7cd(0x1be)](_0x28dc95),this[_0x4ea7cd(0x20d)](_0x4ea7cd(0x40d)),this[_0x4ea7cd(0x30b)]['fontBold']=!![],this[_0x4ea7cd(0x30b)][_0x4ea7cd(0x2ec)]=VisuMZ[_0x4ea7cd(0x209)]['Settings'][_0x4ea7cd(0x1ea)]['TurnFontSize'],_0x58aa2a+=VisuMZ['SkillsStatesCore']['Settings']['States'][_0x4ea7cd(0x485)],_0x31fe92+=VisuMZ[_0x4ea7cd(0x209)][_0x4ea7cd(0x4a7)][_0x4ea7cd(0x1ea)][_0x4ea7cd(0x250)],this['drawText'](_0x2fc652,_0x58aa2a,_0x31fe92,_0x49a89c,'right'),this['contents'][_0x4ea7cd(0x420)]=![],this['resetFontSettings']();},Window_Base['prototype'][_0x3f7c0c(0x4db)]=function(_0x5ee28c,_0x5a6497,_0xc99337,_0x4a59d3){const _0x749346=_0x3f7c0c;if(!VisuMZ[_0x749346(0x209)][_0x749346(0x4a7)]['States'][_0x749346(0x4f5)])return;const _0xa0acf=ImageManager[_0x749346(0x249)],_0x546a66=ImageManager[_0x749346(0x25a)]/0x2,_0x13c2b3=ColorManager['normalColor']();this[_0x749346(0x1be)](_0x13c2b3),this[_0x749346(0x20d)]('rgba(0,\x200,\x200,\x201)'),this[_0x749346(0x30b)][_0x749346(0x420)]=!![],this[_0x749346(0x30b)][_0x749346(0x2ec)]=VisuMZ[_0x749346(0x209)][_0x749346(0x4a7)]['States'][_0x749346(0x4bb)],_0xc99337+=VisuMZ['SkillsStatesCore']['Settings']['States'][_0x749346(0x2a1)],_0x4a59d3+=VisuMZ[_0x749346(0x209)]['Settings'][_0x749346(0x1ea)]['DataOffsetY'];const _0x2b90d2=String(_0x5ee28c[_0x749346(0x3b7)](_0x5a6497['id']));this[_0x749346(0x3ca)](_0x2b90d2,_0xc99337,_0x4a59d3,_0xa0acf,_0x749346(0x48e)),this[_0x749346(0x30b)][_0x749346(0x420)]=![],this['resetFontSettings']();},Window_Base['prototype'][_0x3f7c0c(0x244)]=function(_0x8c3202,_0x2eea5f,_0x302d3a,_0x43581f){const _0x25d07c=_0x3f7c0c;if(!VisuMZ[_0x25d07c(0x209)][_0x25d07c(0x4a7)][_0x25d07c(0x3b9)][_0x25d07c(0x3df)])return;const _0x298ad5=_0x8c3202['buff'](_0x2eea5f);if(_0x298ad5===0x0)return;const _0x41d66e=_0x8c3202[_0x25d07c(0x230)](_0x2eea5f),_0x204f5a=ImageManager['iconWidth'],_0x2ea026=_0x298ad5>0x0?ColorManager[_0x25d07c(0x4aa)]():ColorManager[_0x25d07c(0x4af)]();this['changeTextColor'](_0x2ea026),this['changeOutlineColor'](_0x25d07c(0x40d)),this[_0x25d07c(0x30b)][_0x25d07c(0x420)]=!![],this[_0x25d07c(0x30b)][_0x25d07c(0x2ec)]=VisuMZ['SkillsStatesCore'][_0x25d07c(0x4a7)]['Buffs']['TurnFontSize'],_0x302d3a+=VisuMZ['SkillsStatesCore'][_0x25d07c(0x4a7)][_0x25d07c(0x3b9)][_0x25d07c(0x485)],_0x43581f+=VisuMZ[_0x25d07c(0x209)][_0x25d07c(0x4a7)][_0x25d07c(0x3b9)][_0x25d07c(0x250)],this['drawText'](_0x41d66e,_0x302d3a,_0x43581f,_0x204f5a,_0x25d07c(0x482)),this[_0x25d07c(0x30b)][_0x25d07c(0x420)]=![],this[_0x25d07c(0x1bf)]();},Window_Base[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x42a)]=function(_0x22af3c,_0x1f8950,_0x1688ed,_0x3998fe){const _0x1807c2=_0x3f7c0c;if(!VisuMZ[_0x1807c2(0x209)]['Settings'][_0x1807c2(0x3b9)]['ShowData'])return;const _0xf0b1b3=_0x22af3c['paramBuffRate'](_0x1f8950),_0x783573=_0x22af3c[_0x1807c2(0x475)](_0x1f8950),_0x1eaf6b=ImageManager[_0x1807c2(0x249)],_0x3ae536=ImageManager['iconHeight']/0x2,_0x8a9cb7=_0x783573>0x0?ColorManager['buffColor']():ColorManager[_0x1807c2(0x4af)]();this[_0x1807c2(0x1be)](_0x8a9cb7),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x1807c2(0x30b)][_0x1807c2(0x420)]=!![],this[_0x1807c2(0x30b)][_0x1807c2(0x2ec)]=VisuMZ[_0x1807c2(0x209)][_0x1807c2(0x4a7)][_0x1807c2(0x3b9)]['DataFontSize'],_0x1688ed+=VisuMZ['SkillsStatesCore'][_0x1807c2(0x4a7)]['Buffs'][_0x1807c2(0x2a1)],_0x3998fe+=VisuMZ[_0x1807c2(0x209)][_0x1807c2(0x4a7)]['Buffs']['DataOffsetY'];const _0x380135=_0x1807c2(0x1ae)[_0x1807c2(0x497)](Math[_0x1807c2(0x302)](_0xf0b1b3*0x64));this[_0x1807c2(0x3ca)](_0x380135,_0x1688ed,_0x3998fe,_0x1eaf6b,_0x1807c2(0x48e)),this[_0x1807c2(0x30b)][_0x1807c2(0x420)]=![],this[_0x1807c2(0x1bf)]();},VisuMZ['SkillsStatesCore']['Window_StatusBase_placeGauge']=Window_StatusBase[_0x3f7c0c(0x3b6)]['placeGauge'],Window_StatusBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x349)]=function(_0x2add8d,_0x38fab4,_0x4b7017,_0x5810ca){const _0x13d2a3=_0x3f7c0c;if(_0x2add8d['isActor']())_0x38fab4=this[_0x13d2a3(0x290)](_0x2add8d,_0x38fab4);this[_0x13d2a3(0x4e3)](_0x2add8d,_0x38fab4,_0x4b7017,_0x5810ca);},Window_StatusBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4e3)]=function(_0x440ed1,_0x54aa5f,_0x1479d7,_0x54ffc4){const _0x51bb4f=_0x3f7c0c;if([_0x51bb4f(0x22e),_0x51bb4f(0x1f5)][_0x51bb4f(0x486)](_0x54aa5f[_0x51bb4f(0x3cd)]()))return;VisuMZ[_0x51bb4f(0x209)]['Window_StatusBase_placeGauge'][_0x51bb4f(0x3da)](this,_0x440ed1,_0x54aa5f,_0x1479d7,_0x54ffc4);},Window_StatusBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x290)]=function(_0x3ef741,_0xc36e58){const _0x5e1baf=_0x3f7c0c,_0x1751a6=_0x3ef741['currentClass']()[_0x5e1baf(0x4de)];if(_0xc36e58==='hp'&&_0x1751a6['match'](/<REPLACE HP GAUGE:[ ](.*)>/i)){if(_0x5e1baf(0x3ea)!==_0x5e1baf(0x2e4))return String(RegExp['$1']);else{const _0x3f7b0b=_0x49edb7(_0x31b090['$1']),_0x33aa2a=_0x533354['format'](_0x3f7b0b,_0x5e1baf(0x436),-0x1,'slipHp');_0x406028[_0x5e1baf(0x209)][_0x5e1baf(0x3ee)][_0x35e493['id']]=new _0xcb7b12('stateId',_0x33aa2a);}}else{if(_0xc36e58==='mp'&&_0x1751a6[_0x5e1baf(0x238)](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x5e1baf(0x317)===_0x5e1baf(0x428))this[_0x5e1baf(0x36f)][_0x5e1baf(0x2f2)](),this[_0x5e1baf(0x21e)]();else return String(RegExp['$1']);}else return _0xc36e58==='tp'&&_0x1751a6[_0x5e1baf(0x238)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0xc36e58;}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x321)]=Window_StatusBase[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x2ea)],Window_StatusBase['prototype'][_0x3f7c0c(0x2ea)]=function(_0x474cad,_0x4e307f,_0x5a1df5,_0x4c393c){const _0x51d1dc=_0x3f7c0c;if(!_0x474cad)return;Window_Base[_0x51d1dc(0x3b6)][_0x51d1dc(0x2ea)][_0x51d1dc(0x3da)](this,_0x474cad,_0x4e307f,_0x5a1df5,_0x4c393c);},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x44c)]=Window_SkillType['prototype'][_0x3f7c0c(0x432)],Window_SkillType['prototype'][_0x3f7c0c(0x432)]=function(_0x1fd8d5){const _0xc0c830=_0x3f7c0c;VisuMZ[_0xc0c830(0x209)][_0xc0c830(0x44c)][_0xc0c830(0x3da)](this,_0x1fd8d5),this[_0xc0c830(0x372)](_0x1fd8d5);},Window_SkillType['prototype']['createCommandNameWindow']=function(_0xdafdda){const _0x346d3d=_0x3f7c0c,_0x3e3d5e=new Rectangle(0x0,0x0,_0xdafdda[_0x346d3d(0x3f4)],_0xdafdda[_0x346d3d(0x1cc)]);this['_commandNameWindow']=new Window_Base(_0x3e3d5e),this[_0x346d3d(0x44e)][_0x346d3d(0x1da)]=0x0,this[_0x346d3d(0x4e9)](this[_0x346d3d(0x44e)]),this[_0x346d3d(0x357)]();},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x3b4)]=function(){const _0x4eea2f=_0x3f7c0c;Window_Command[_0x4eea2f(0x3b6)][_0x4eea2f(0x3b4)]['call'](this);if(this[_0x4eea2f(0x44e)])this[_0x4eea2f(0x357)]();},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x357)]=function(){const _0x1e9364=_0x3f7c0c,_0x197f16=this['_commandNameWindow'];_0x197f16['contents'][_0x1e9364(0x2f2)]();const _0x4c6c2c=this[_0x1e9364(0x383)](this['index']());if(_0x4c6c2c===_0x1e9364(0x211)&&this['maxItems']()>0x0){if(_0x1e9364(0x1cd)!==_0x1e9364(0x4fe)){const _0x1b02d2=this[_0x1e9364(0x2ab)](this['index']());let _0x16defb=this[_0x1e9364(0x4fc)](this[_0x1e9364(0x50a)]());_0x16defb=_0x16defb[_0x1e9364(0x3ae)](/\\I\[(\d+)\]/gi,''),_0x197f16['resetFontSettings'](),this[_0x1e9364(0x427)](_0x16defb,_0x1b02d2),this[_0x1e9364(0x246)](_0x16defb,_0x1b02d2),this[_0x1e9364(0x4ce)](_0x16defb,_0x1b02d2);}else return _0x397a9b['SkillsStatesCore'][_0x1e9364(0x4a7)][_0x1e9364(0x24e)][_0x1e9364(0x1f7)];}},Window_SkillType['prototype']['commandNameWindowDrawBackground']=function(_0x2686c6,_0x3f0f20){},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x246)]=function(_0x3150f9,_0xa34c98){const _0x32466a=_0x3f7c0c,_0x47b71a=this[_0x32466a(0x44e)];_0x47b71a[_0x32466a(0x3ca)](_0x3150f9,0x0,_0xa34c98['y'],_0x47b71a[_0x32466a(0x4cc)],_0x32466a(0x48e));},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4ce)]=function(_0x1e7c07,_0x294590){const _0x382501=_0x3f7c0c,_0x3cfdfb=this[_0x382501(0x44e)],_0x25935=$gameSystem['windowPadding'](),_0x35e4fd=_0x294590['x']+Math[_0x382501(0x3e9)](_0x294590[_0x382501(0x3f4)]/0x2)+_0x25935;_0x3cfdfb['x']=_0x3cfdfb['width']/-0x2+_0x35e4fd,_0x3cfdfb['y']=Math[_0x382501(0x3e9)](_0x294590['height']/0x2);},Window_SkillType['prototype'][_0x3f7c0c(0x2bc)]=function(){const _0x24d040=_0x3f7c0c;return Imported[_0x24d040(0x4fd)]&&Window_Command[_0x24d040(0x3b6)][_0x24d040(0x2bc)][_0x24d040(0x3da)](this);},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x266)]=function(){const _0x45885a=_0x3f7c0c;if(!this[_0x45885a(0x4d1)])return;const _0xc3e43f=this['_actor'][_0x45885a(0x1ab)]();for(const _0x247315 of _0xc3e43f){if(_0x45885a(0x3d0)===_0x45885a(0x3d0)){const _0x1898e1=this[_0x45885a(0x2c2)](_0x247315);this[_0x45885a(0x2f9)](_0x1898e1,'skill',!![],_0x247315);}else this[_0x45885a(0x2db)]()!==''?this[_0x45885a(0x36a)]():(_0xe385f[_0x45885a(0x209)][_0x45885a(0x2a3)][_0x45885a(0x3da)](this),this[_0x45885a(0x2df)]());}},Window_SkillType['prototype'][_0x3f7c0c(0x2c2)]=function(_0x440e5c){const _0x26ad05=_0x3f7c0c;let _0x38e78a=$dataSystem[_0x26ad05(0x1ab)][_0x440e5c];if(_0x38e78a[_0x26ad05(0x238)](/\\I\[(\d+)\]/i))return _0x38e78a;if(this[_0x26ad05(0x514)]()===_0x26ad05(0x44a))return _0x38e78a;const _0x23b59a=VisuMZ[_0x26ad05(0x209)][_0x26ad05(0x4a7)][_0x26ad05(0x24e)],_0x17c53f=$dataSystem[_0x26ad05(0x49d)][_0x26ad05(0x486)](_0x440e5c),_0x596843=_0x17c53f?_0x23b59a[_0x26ad05(0x4f8)]:_0x23b59a[_0x26ad05(0x3ed)];return _0x26ad05(0x268)[_0x26ad05(0x497)](_0x596843,_0x38e78a);},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x287)]=function(){const _0x4ae9fa=_0x3f7c0c;return VisuMZ['SkillsStatesCore']['Settings'][_0x4ae9fa(0x24e)][_0x4ae9fa(0x1f7)];},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x474)]=function(_0x603437){const _0x48719a=_0x3f7c0c,_0x3c5307=this[_0x48719a(0x383)](_0x603437);if(_0x3c5307===_0x48719a(0x34a))this[_0x48719a(0x28b)](_0x603437);else{if(_0x3c5307==='icon'){if(_0x48719a(0x322)===_0x48719a(0x389)){const _0x422772=this[_0x48719a(0x229)](_0x3a33a7,_0xea24fb),_0x2d2f0d=this[_0x48719a(0x29b)](_0x422772,_0x50e1c4,_0x556199,_0x4071dc),_0x2b0f3e=_0x3c18f+_0x1cb8c2-_0x2d2f0d[_0x48719a(0x3f4)];this['drawTextEx'](_0x422772,_0x2b0f3e,_0x1419c9,_0x27c251),this[_0x48719a(0x1bf)]();}else this[_0x48719a(0x36c)](_0x603437);}else Window_Command[_0x48719a(0x3b6)][_0x48719a(0x474)]['call'](this,_0x603437);}},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x514)]=function(){const _0x12262f=_0x3f7c0c;return VisuMZ[_0x12262f(0x209)][_0x12262f(0x4a7)]['Skills'][_0x12262f(0x48f)];},Window_SkillType['prototype'][_0x3f7c0c(0x383)]=function(_0x352dfc){const _0xe82cc2=_0x3f7c0c;if(_0x352dfc<0x0)return'text';const _0x17b88b=this[_0xe82cc2(0x514)]();if(_0x17b88b!==_0xe82cc2(0x22f)){if('pihRD'!==_0xe82cc2(0x421))for(const _0xc82a2 of _0x18189c){_0xc82a2[_0xe82cc2(0x238)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x416d2b=_0x53ff02['indexOf'](_0x85d1a9(_0x422ade['$1'])[_0xe82cc2(0x20a)]()),_0x31b103=_0x5bfa5e(_0x513603['$2']);_0x416d2b>=0x0&&(_0x47f2ce[_0xe82cc2(0x2ce)](_0x416d2b,_0x31b103),this['makeSuccess'](_0x13d6f7));}else return _0x17b88b;}else{if(this[_0xe82cc2(0x4e2)]()>0x0){if(_0xe82cc2(0x2d4)===_0xe82cc2(0x2d4)){const _0x304f56=this['commandName'](_0x352dfc);if(_0x304f56[_0xe82cc2(0x238)](/\\I\[(\d+)\]/i)){const _0x32f084=this[_0xe82cc2(0x2ab)](_0x352dfc),_0x3ae7ed=this[_0xe82cc2(0x29b)](_0x304f56)[_0xe82cc2(0x3f4)];if(_0x3ae7ed<=_0x32f084[_0xe82cc2(0x3f4)]){if(_0xe82cc2(0x508)===_0xe82cc2(0x41b)){const _0x4b0883=_0x4926e8[_0xe82cc2(0x3b6)][_0xe82cc2(0x27b)]();this[_0xe82cc2(0x44b)]=new _0x35c8d1(),this['_turnDisplaySprite'][_0xe82cc2(0x36f)]=new _0x4f31b3(_0x4cf91b[_0xe82cc2(0x249)],_0x4b0883),this[_0xe82cc2(0x44b)]['anchor']['x']=this['anchor']['x'],this['_turnDisplaySprite'][_0xe82cc2(0x32a)]['y']=this[_0xe82cc2(0x32a)]['y'],this[_0xe82cc2(0x4e9)](this[_0xe82cc2(0x44b)]),this[_0xe82cc2(0x30b)]=this[_0xe82cc2(0x44b)][_0xe82cc2(0x36f)];}else return _0xe82cc2(0x34a);}else{if(_0xe82cc2(0x2d0)!==_0xe82cc2(0x2d0)){if(_0x85a920[_0xe82cc2(0x4b6)](_0x1de308))return!![];}else return _0xe82cc2(0x211);}}}else{const _0x53ec9b=_0x4889a9[_0xe82cc2(0x39e)];if(![_0x4be523,_0x2ad7fb][_0xe82cc2(0x486)](_0x53ec9b[_0xe82cc2(0x1dd)]))return _0x1fb111['menuActor']();}}}return _0xe82cc2(0x44a);},Window_SkillType[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x28b)]=function(_0x418e9e){const _0xa59c39=_0x3f7c0c,_0x5aec36=this[_0xa59c39(0x2ab)](_0x418e9e),_0x22c770=this['commandName'](_0x418e9e),_0x13af49=this[_0xa59c39(0x29b)](_0x22c770)['width'];this[_0xa59c39(0x1af)](this['isCommandEnabled'](_0x418e9e));const _0x3e9574=this[_0xa59c39(0x287)]();if(_0x3e9574===_0xa59c39(0x482)){if(_0xa59c39(0x3b2)==='zKCBl')this[_0xa59c39(0x1e9)](_0x22c770,_0x5aec36['x']+_0x5aec36[_0xa59c39(0x3f4)]-_0x13af49,_0x5aec36['y'],_0x13af49);else return this[_0xa59c39(0x2ac)]&&this[_0xa59c39(0x4b8)]?this[_0xa59c39(0x1bb)]():_0x1c9b6f[_0xa59c39(0x209)][_0xa59c39(0x21d)][_0xa59c39(0x3da)](this);}else{if(_0x3e9574===_0xa59c39(0x48e)){const _0x3f4a1f=_0x5aec36['x']+Math[_0xa59c39(0x3e9)]((_0x5aec36[_0xa59c39(0x3f4)]-_0x13af49)/0x2);this[_0xa59c39(0x1e9)](_0x22c770,_0x3f4a1f,_0x5aec36['y'],_0x13af49);}else this[_0xa59c39(0x1e9)](_0x22c770,_0x5aec36['x'],_0x5aec36['y'],_0x13af49);}},Window_SkillType['prototype']['drawItemStyleIcon']=function(_0x179bf3){const _0xe59741=_0x3f7c0c;this[_0xe59741(0x4fc)](_0x179bf3)[_0xe59741(0x238)](/\\I\[(\d+)\]/i);const _0x3cd492=Number(RegExp['$1'])||0x0,_0x30a7a0=this[_0xe59741(0x2ab)](_0x179bf3),_0x3c37b8=_0x30a7a0['x']+Math[_0xe59741(0x3e9)]((_0x30a7a0[_0xe59741(0x3f4)]-ImageManager['iconWidth'])/0x2),_0x58fbd7=_0x30a7a0['y']+(_0x30a7a0[_0xe59741(0x1cc)]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x3cd492,_0x3c37b8,_0x58fbd7);},VisuMZ['SkillsStatesCore']['Window_SkillStatus_refresh']=Window_SkillStatus[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x37b)],Window_SkillStatus[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x37b)]=function(){const _0x47e741=_0x3f7c0c;VisuMZ[_0x47e741(0x209)][_0x47e741(0x2f0)][_0x47e741(0x3da)](this);if(this['_actor'])this[_0x47e741(0x1d1)]();},Window_SkillStatus[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1d1)]=function(){const _0x3d8f84=_0x3f7c0c;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0x1ee56c=this[_0x3d8f84(0x3a7)]();let _0x4fd787=this[_0x3d8f84(0x33b)]()/0x2+0xb4+0xb4+0xb4,_0x2f0996=this[_0x3d8f84(0x4cc)]-_0x4fd787-0x2;if(_0x2f0996>=0x12c){const _0x450d9c=VisuMZ[_0x3d8f84(0x343)][_0x3d8f84(0x4a7)][_0x3d8f84(0x4b0)][_0x3d8f84(0x33a)],_0x29fe5e=Math['floor'](_0x2f0996/0x2)-0x18;let _0x277b1c=_0x4fd787,_0x4f09d7=Math[_0x3d8f84(0x3e9)]((this['innerHeight']-Math['ceil'](_0x450d9c[_0x3d8f84(0x356)]/0x2)*_0x1ee56c)/0x2),_0x234e74=0x0;for(const _0x430caa of _0x450d9c){'gdsqU'==='nGkxc'?(this[_0x3d8f84(0x36f)]['clear'](),this[_0x3d8f84(0x4b8)][_0x3d8f84(0x37d)][_0x3d8f84(0x3da)](this)):(this[_0x3d8f84(0x423)](_0x277b1c,_0x4f09d7,_0x29fe5e,_0x430caa),_0x234e74++,_0x234e74%0x2===0x0?'ZFVnF'!==_0x3d8f84(0x347)?(_0x277b1c=_0x4fd787,_0x4f09d7+=_0x1ee56c):(_0x597930[_0x3d8f84(0x209)][_0x3d8f84(0x2ad)]['call'](this,_0x4849c5),this[_0x3d8f84(0x3e6)]()):_0x277b1c+=_0x29fe5e+0x18);}}this['resetFontSettings']();},Window_SkillStatus[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x423)]=function(_0x93d649,_0x43ec4e,_0x1ad571,_0x250463){const _0x1e9354=_0x3f7c0c,_0xb12de0=this[_0x1e9354(0x3a7)]();this[_0x1e9354(0x1bf)](),this[_0x1e9354(0x3ec)](_0x93d649,_0x43ec4e,_0x1ad571,_0x250463,!![]),this[_0x1e9354(0x26a)](),this['contents'][_0x1e9354(0x2ec)]-=0x8;const _0x1d948c=this['_actor']['paramValueByName'](_0x250463,!![]);this['contents'][_0x1e9354(0x3ca)](_0x1d948c,_0x93d649,_0x43ec4e,_0x1ad571,_0xb12de0,_0x1e9354(0x482));},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x4c5)]=Window_SkillList['prototype'][_0x3f7c0c(0x486)],Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x486)]=function(_0x1b1c0f){return this['includesSkillsStatesCore'](_0x1b1c0f);},VisuMZ[_0x3f7c0c(0x209)]['Window_SkillList_maxCols']=Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x41c)],Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x41c)]=function(){const _0x3d76ed=_0x3f7c0c;return SceneManager[_0x3d76ed(0x39e)][_0x3d76ed(0x1dd)]===Scene_Battle?VisuMZ[_0x3d76ed(0x209)]['Window_SkillList_maxCols']['call'](this):VisuMZ[_0x3d76ed(0x209)][_0x3d76ed(0x4a7)]['Skills'][_0x3d76ed(0x2dc)];},VisuMZ[_0x3f7c0c(0x209)]['Window_SkillList_setActor']=Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x27c)],Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x27c)]=function(_0x6fe5de){const _0x48a50c=_0x3f7c0c,_0x4096b1=this[_0x48a50c(0x4d1)]!==_0x6fe5de;VisuMZ[_0x48a50c(0x209)][_0x48a50c(0x45c)][_0x48a50c(0x3da)](this,_0x6fe5de);if(_0x4096b1){if(_0x48a50c(0x2c1)!==_0x48a50c(0x299))this['_statusWindow']&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x48a50c(0x1e4)][_0x48a50c(0x4d8)](this[_0x48a50c(0x32f)](0x0));else{if(!_0x4709f2[_0x48a50c(0x2fe)](_0x3f4636))return![];}}},Window_SkillList['prototype']['setStypeId']=function(_0x56d7de){const _0x14b449=_0x3f7c0c;if(this[_0x14b449(0x2b6)]===_0x56d7de)return;this[_0x14b449(0x2b6)]=_0x56d7de,this[_0x14b449(0x37b)](),this['scrollTo'](0x0,0x0),this[_0x14b449(0x1e4)]&&this[_0x14b449(0x1e4)][_0x14b449(0x1dd)]===Window_ShopStatus&&this[_0x14b449(0x1e4)][_0x14b449(0x4d8)](this['itemAt'](0x0));},Window_SkillList[_0x3f7c0c(0x3b6)]['includesSkillsStatesCore']=function(_0x250dac){const _0x55d88c=_0x3f7c0c;if(!_0x250dac)return VisuMZ[_0x55d88c(0x209)][_0x55d88c(0x4c5)]['call'](this,_0x250dac);if(!this[_0x55d88c(0x4fb)](_0x250dac))return![];if(!this[_0x55d88c(0x311)](_0x250dac))return![];if(!this[_0x55d88c(0x269)](_0x250dac))return![];return!![];},Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x4fb)]=function(_0x4693ba){const _0x26d157=_0x3f7c0c;return DataManager[_0x26d157(0x515)](_0x4693ba)[_0x26d157(0x486)](this[_0x26d157(0x2b6)]);},Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x311)]=function(_0x172434){const _0x37bab8=_0x3f7c0c;if(!VisuMZ['SkillsStatesCore'][_0x37bab8(0x4d9)](this[_0x37bab8(0x4d1)],_0x172434))return![];if(!VisuMZ[_0x37bab8(0x209)][_0x37bab8(0x415)](this[_0x37bab8(0x4d1)],_0x172434))return![];if(!VisuMZ[_0x37bab8(0x209)][_0x37bab8(0x25e)](this[_0x37bab8(0x4d1)],_0x172434))return![];return!![];},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x4d9)]=function(_0x120461,_0x3e0ea4){const _0x54cdc8=_0x3f7c0c,_0x164fb8=_0x3e0ea4[_0x54cdc8(0x4de)];if(_0x164fb8[_0x54cdc8(0x238)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x54cdc8(0x36d)]())return![];else return _0x164fb8[_0x54cdc8(0x238)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x54cdc8(0x36d)]()?![]:!![];},VisuMZ['SkillsStatesCore'][_0x3f7c0c(0x415)]=function(_0x1ddd3e,_0x2edfa3){const _0x1ea6c9=_0x3f7c0c,_0x476aad=_0x2edfa3[_0x1ea6c9(0x4de)];if(_0x476aad[_0x1ea6c9(0x238)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e9469=JSON[_0x1ea6c9(0x4e0)]('['+RegExp['$1'][_0x1ea6c9(0x238)](/\d+/g)+']');for(const _0x409ad8 of _0x2e9469){if(_0x1ea6c9(0x4d4)!==_0x1ea6c9(0x39a)){if(!$gameSwitches['value'](_0x409ad8))return![];}else{if(_0x4e2bfd[_0x1ea6c9(0x356)]>0x0)_0xcb1986+=this[_0x1ea6c9(0x459)]();_0x580685+=_0x188891(_0x3e43f9['$1']);}}return!![];}if(_0x476aad[_0x1ea6c9(0x238)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1ea6c9(0x2d2)===_0x1ea6c9(0x25c)){const _0x269525=this[_0x1ea6c9(0x4eb)][_0x1ea6c9(0x4be)]||0x0;this[_0x1ea6c9(0x1ec)](_0x233d7e),this['_result'][_0x1ea6c9(0x4be)]+=_0x269525;}else{const _0x920cc5=JSON[_0x1ea6c9(0x4e0)]('['+RegExp['$1'][_0x1ea6c9(0x238)](/\d+/g)+']');for(const _0x433b64 of _0x920cc5){if(!$gameSwitches[_0x1ea6c9(0x4b6)](_0x433b64))return![];}return!![];}}if(_0x476aad[_0x1ea6c9(0x238)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1ea6c9(0x35a)==='uhhuG'){if(_0x364fc1[_0x1ea6c9(0x3e0)])return;this[_0x1ea6c9(0x28c)](),this[_0x1ea6c9(0x394)]();}else{const _0x2078e0=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4963a0 of _0x2078e0){if(_0x1ea6c9(0x374)===_0x1ea6c9(0x473))this['isStateExpired'](_0x2708e0['id'])&&_0x107d9a[_0x1ea6c9(0x3d4)]===_0xc44e72&&(this['removeState'](_0x248698['id']),this[_0x1ea6c9(0x337)](_0x3ec2b7['id']),this['onExpireStateGlobalJS'](_0x3bd515['id']));else{if($gameSwitches['value'](_0x4963a0))return!![];}}return![];}}if(_0x476aad[_0x1ea6c9(0x238)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5efb38=JSON[_0x1ea6c9(0x4e0)]('['+RegExp['$1'][_0x1ea6c9(0x238)](/\d+/g)+']');for(const _0x48fb18 of _0x5efb38){if(!$gameSwitches[_0x1ea6c9(0x4b6)](_0x48fb18))return!![];}return![];}if(_0x476aad[_0x1ea6c9(0x238)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a88e8=JSON[_0x1ea6c9(0x4e0)]('['+RegExp['$1'][_0x1ea6c9(0x238)](/\d+/g)+']');for(const _0x50896d of _0x5a88e8){if(_0x1ea6c9(0x384)!==_0x1ea6c9(0x384))_0x712b3f[_0x1ea6c9(0x4e5)]['push'](_0x1ea6c9(0x481));else{if(!$gameSwitches[_0x1ea6c9(0x4b6)](_0x50896d))return!![];}}return![];}if(_0x476aad[_0x1ea6c9(0x238)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1ea6c9(0x493)!==_0x1ea6c9(0x493)){const _0x320572=_0x4299d9['stateMaximumTurns'](_0xb4c3fb);this[_0x1ea6c9(0x1b9)][_0xd2a30b]=this[_0x1ea6c9(0x1b9)][_0x4f161f][_0x1ea6c9(0x256)](0x0,_0x320572);}else{const _0x4cec29=JSON['parse']('['+RegExp['$1'][_0x1ea6c9(0x238)](/\d+/g)+']');for(const _0x231cfb of _0x4cec29){if($gameSwitches['value'](_0x231cfb))return![];}return!![];}}return!![];},VisuMZ[_0x3f7c0c(0x209)]['CheckVisibleSkillNotetags']=function(_0x4b3b43,_0x3b3fd6){const _0xa35433=_0x3f7c0c,_0x380cb4=_0x3b3fd6[_0xa35433(0x4de)];if(_0x380cb4[_0xa35433(0x238)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa35433(0x3e3)===_0xa35433(0x3e3)){const _0x208157=JSON['parse']('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x531aff of _0x208157){if(_0xa35433(0x33f)==='BmNsL')return _0x3f3067['SkillsStatesCore'][_0xa35433(0x289)]['call'](this);else{if(!_0x4b3b43[_0xa35433(0x30e)](_0x531aff))return![];}}return!![];}else return _0x59b6e1['outlineColor']();}else{if(_0x380cb4[_0xa35433(0x238)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x306341=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x2fffcc of _0x306341){if(_0xa35433(0x1f8)!==_0xa35433(0x50e)){const _0x339a3a=DataManager['getSkillIdWithName'](_0x2fffcc);if(!_0x339a3a)continue;if(!_0x4b3b43[_0xa35433(0x30e)](_0x339a3a))return![];}else{if(!_0x523254[_0xa35433(0x4b6)](_0x10aa88))return!![];}}return!![];}}if(_0x380cb4[_0xa35433(0x238)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5442aa=JSON[_0xa35433(0x4e0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x28a089 of _0x5442aa){if(_0xa35433(0x3f8)===_0xa35433(0x397))return this[_0xa35433(0x49b)][_0xf40f99]===_0x98650['SkillsStatesCore'][_0xa35433(0x4a7)]['Buffs']['StackBuffMax'];else{if(!_0x4b3b43[_0xa35433(0x30e)](_0x28a089))return![];}}return!![];}else{if(_0x380cb4['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x17762=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x4b3db9 of _0x17762){if(_0xa35433(0x30a)!==_0xa35433(0x338)){const _0x4cb718=DataManager[_0xa35433(0x2f4)](_0x4b3db9);if(!_0x4cb718)continue;if(!_0x4b3b43[_0xa35433(0x30e)](_0x4cb718))return![];}else this[_0xa35433(0x316)][_0x57c27e]=_0x24ddf7[_0xa35433(0x209)]['Settings'][_0xa35433(0x1ea)][_0xa35433(0x227)];}return!![];}}if(_0x380cb4['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4523d5=JSON[_0xa35433(0x4e0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3cc9be of _0x4523d5){if(_0x4b3b43['isLearnedSkill'](_0x3cc9be))return!![];}return![];}else{if(_0x380cb4[_0xa35433(0x238)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x65bf4a=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x4fc26b of _0x65bf4a){const _0xd3323f=DataManager['getSkillIdWithName'](_0x4fc26b);if(!_0xd3323f)continue;if(_0x4b3b43[_0xa35433(0x30e)](_0xd3323f))return!![];}return![];}}if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa35433(0x40f)==='neyhO'){const _0x320bc0=_0x34b15d[_0xa35433(0x3e1)];for(const _0xe4651c of _0x320bc0){if(_0x391e1a[_0xa35433(0x4b6)](_0xe4651c))return![];}}else{const _0x23464a=JSON[_0xa35433(0x4e0)]('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x3fbd4e of _0x23464a){if(_0xa35433(0x489)!=='TlmHr'){if(!_0x4b3b43[_0xa35433(0x30e)](_0x3fbd4e))return!![];}else this[_0xa35433(0x225)](_0x4cf6eb);}return![];}}else{if(_0x380cb4['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xa35433(0x2b3)!==_0xa35433(0x3b1)){const _0x47a53a=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x2fd200 of _0x47a53a){const _0x9d9082=DataManager['getSkillIdWithName'](_0x2fd200);if(!_0x9d9082)continue;if(!_0x4b3b43[_0xa35433(0x30e)](_0x9d9082))return!![];}return![];}else this['_cache']={},this[_0xa35433(0x2df)](),_0xc65a3a[_0xa35433(0x209)][_0xa35433(0x27d)][_0xa35433(0x3da)](this);}}if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa35433(0x464)==='jhYVm'){if(!_0x5f5af6)return;_0x3415ed[_0xa35433(0x209)]['Window_StatusBase_drawActorIcons'][_0xa35433(0x3da)](this,_0xda9223,_0x1ec3da,_0x255722,_0x9bbcae),this[_0xa35433(0x47c)](_0xe11b53,_0x311891,_0xc9b01b,_0x54eb9b);}else{const _0x35a207=JSON[_0xa35433(0x4e0)]('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x4a72fe of _0x35a207){if(!_0x4b3b43['isLearnedSkill'](_0x4a72fe))return!![];}return![];}}else{if(_0x380cb4['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xa35433(0x3d8)!==_0xa35433(0x3d8)){const _0x13551c=_0x12817d[_0xa35433(0x4e0)]('['+_0x25d06a['$1']['match'](/\d+/g)+']');for(const _0xa4dfd7 of _0x13551c){if(!_0x6ac95e[_0xa35433(0x4b6)](_0xa4dfd7))return!![];}return![];}else{const _0x3ae25f=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x518c03 of _0x3ae25f){if(_0xa35433(0x4b4)!==_0xa35433(0x324)){const _0x305cb1=DataManager[_0xa35433(0x2f4)](_0x518c03);if(!_0x305cb1)continue;if(!_0x4b3b43[_0xa35433(0x30e)](_0x305cb1))return!![];}else return this[_0xa35433(0x3ba)]=this[_0xa35433(0x3ba)]||_0x124d20[_0xa35433(0x458)],this[_0xa35433(0x3ba)];}return![];}}}if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa35433(0x44d)===_0xa35433(0x44d)){const _0x57b15f=JSON[_0xa35433(0x4e0)]('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x510da4 of _0x57b15f){if(_0x4b3b43[_0xa35433(0x30e)](_0x510da4))return![];}return!![];}else{let _0x6622f8=_0xbced41[_0xa35433(0x209)][_0xa35433(0x454)][_0xa35433(0x3da)](this);return _0x14c337[_0xa35433(0x3f5)]&&(_0x6622f8=_0x6622f8[_0xa35433(0x390)](this['members']()['filter'](_0x1ddaa8=>_0x1ddaa8[_0xa35433(0x46b)]()))),_0x6622f8;}}else{if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5ee231=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x2b2ed1 of _0x5ee231){const _0x3e7162=DataManager[_0xa35433(0x2f4)](_0x2b2ed1);if(!_0x3e7162)continue;if(_0x4b3b43[_0xa35433(0x30e)](_0x3e7162))return![];}return!![];}}if(_0x380cb4['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa35433(0x3d5)!==_0xa35433(0x46a)){const _0x5eea74=JSON[_0xa35433(0x4e0)]('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x26d256 of _0x5eea74){if(!_0x4b3b43[_0xa35433(0x2fe)](_0x26d256))return![];}return!![];}else return _0xbf7a9e(_0x8a54e9['$1']);}else{if(_0x380cb4[_0xa35433(0x238)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('yHpkJ'===_0xa35433(0x205))return _0xf59880=_0x4e2e28[_0xa35433(0x256)](-0x2,0x2),_0x4e8687[_0xa35433(0x209)][_0xa35433(0x401)][_0xa35433(0x3da)](this,_0xc81e9,_0x6edad5);else{const _0x1bda4d=RegExp['$1']['split'](',');for(const _0x406402 of _0x1bda4d){const _0x15f07c=DataManager[_0xa35433(0x2f4)](_0x406402);if(!_0x15f07c)continue;if(!_0x4b3b43[_0xa35433(0x2fe)](_0x15f07c))return![];}return!![];}}}if(_0x380cb4[_0xa35433(0x238)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa35433(0x22c)!==_0xa35433(0x22c)){const _0x243514=this[_0xa35433(0x4d1)]!==_0x309d6b;_0x4a4076['SkillsStatesCore']['Window_SkillList_setActor'][_0xa35433(0x3da)](this,_0x1fab2b),_0x243514&&(this[_0xa35433(0x1e4)]&&this[_0xa35433(0x1e4)][_0xa35433(0x1dd)]===_0x33680e&&this['_statusWindow'][_0xa35433(0x4d8)](this['itemAt'](0x0)));}else{const _0x102e05=JSON[_0xa35433(0x4e0)]('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x1cc270 of _0x102e05){if(_0xa35433(0x45d)===_0xa35433(0x3f9)){const _0x2d0ca7=_0x25f488[_0xa35433(0x4de)];if(_0x2d0ca7[_0xa35433(0x238)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x85ca8d=_0x644658(_0x4c5163['$1']),_0x7985af='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0xa35433(0x497)](_0x85ca8d);_0x112a9d[_0xa35433(0x209)][_0xa35433(0x413)][_0x26ad68['id']]=new _0x2b9e07('state',_0x7985af);}}else{if(!_0x4b3b43[_0xa35433(0x2fe)](_0x1cc270))return![];}}return!![];}}else{if(_0x380cb4['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('cFavZ'!==_0xa35433(0x509)){if(!_0x46c3ae[_0xa35433(0x4b6)](_0x4177cb))return![];}else{const _0xd6159=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x5d8d93 of _0xd6159){const _0x25b46f=DataManager['getSkillIdWithName'](_0x5d8d93);if(!_0x25b46f)continue;if(!_0x4b3b43[_0xa35433(0x2fe)](_0x25b46f))return![];}return!![];}}}if(_0x380cb4[_0xa35433(0x238)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xa35433(0x4e8)===_0xa35433(0x4e8)){const _0x422802=JSON['parse']('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x5dd747 of _0x422802){if(_0xa35433(0x2e8)!==_0xa35433(0x315)){if(_0x4b3b43[_0xa35433(0x2fe)](_0x5dd747))return!![];}else _0x249fa3[_0xa35433(0x209)][_0xa35433(0x4a7)][_0xa35433(0x3b9)][_0xa35433(0x3f7)][_0xa35433(0x3da)](this,_0x1167a5);}return![];}else{if(!this[_0xa35433(0x1e5)](_0x5d06b3))return![];if(!_0xae4dd3)return![];if(!this[_0xa35433(0x1e2)](_0x43c1e1))return![];if(this[_0xa35433(0x507)](_0x485808))return![];return!![];}}else{if(_0x380cb4[_0xa35433(0x238)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xa35433(0x35c)!==_0xa35433(0x35c)){this['_stypeIDs']=this[_0xa35433(0x295)]||{};if(this[_0xa35433(0x295)][_0x39cc74['id']])return this[_0xa35433(0x295)][_0x58fb91['id']];this[_0xa35433(0x295)][_0x38128d['id']]=[_0x558cb8[_0xa35433(0x34c)]];if(_0x27ca4c[_0xa35433(0x4de)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x198b34=_0x12d54e['parse']('['+_0xb25f5['$1'][_0xa35433(0x238)](/\d+/g)+']');this[_0xa35433(0x295)][_0x42332a['id']]=this[_0xa35433(0x295)][_0x5549cf['id']][_0xa35433(0x390)](_0x198b34);}else{if(_0x9a137c[_0xa35433(0x4de)][_0xa35433(0x238)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x28d127=_0x1443b4['$1'][_0xa35433(0x34d)](',');for(const _0x461dab of _0x28d127){const _0x1bdef5=_0x460be4[_0xa35433(0x253)](_0x461dab);if(_0x1bdef5)this[_0xa35433(0x295)][_0x2f34ea['id']][_0xa35433(0x4c2)](_0x1bdef5);}}}return this['_stypeIDs'][_0x27fa90['id']];}else{const _0x2eea2f=RegExp['$1']['split'](',');for(const _0x3983e3 of _0x2eea2f){const _0x3a15a7=DataManager[_0xa35433(0x2f4)](_0x3983e3);if(!_0x3a15a7)continue;if(_0x4b3b43[_0xa35433(0x2fe)](_0x3a15a7))return!![];}return![];}}}if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e9679=JSON[_0xa35433(0x4e0)]('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x12d440 of _0x5e9679){if(_0xa35433(0x45f)===_0xa35433(0x45f)){if(!_0x4b3b43[_0xa35433(0x2fe)](_0x12d440))return!![];}else for(const _0x504d27 of _0x4eb151){_0x504d27[_0xa35433(0x238)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x442970=_0x1c94ef[_0xa35433(0x1d0)](_0x3782cc(_0x402a59['$1'])[_0xa35433(0x20a)]()),_0x56633d=_0x333152(_0x1addd1['$2']);_0x442970>=0x0&&(_0x2a49a7[_0xa35433(0x1e7)](_0x442970,_0x56633d),this['makeSuccess'](_0x32d8af));}}return![];}else{if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x285f62=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x2ccd8f of _0x285f62){const _0x53914e=DataManager[_0xa35433(0x2f4)](_0x2ccd8f);if(!_0x53914e)continue;if(!_0x4b3b43[_0xa35433(0x2fe)](_0x53914e))return!![];}return![];}}if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d3822=JSON[_0xa35433(0x4e0)]('['+RegExp['$1'][_0xa35433(0x238)](/\d+/g)+']');for(const _0x35a6fa of _0x1d3822){if('aJYPd'!=='MEUCQ'){if(!_0x4b3b43['hasSkill'](_0x35a6fa))return!![];}else{const _0x78349f=_0x3c361c(_0x59707e['$1']);if(_0x3f9216['isStateAffected'](_0x78349f))return!![];}}return![];}else{if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x52bda1=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x11568e of _0x52bda1){const _0x4a4bab=DataManager[_0xa35433(0x2f4)](_0x11568e);if(!_0x4a4bab)continue;if(!_0x4b3b43[_0xa35433(0x2fe)](_0x4a4bab))return!![];}return![];}}if(_0x380cb4[_0xa35433(0x238)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x318e68=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3f9f3d of _0x318e68){if(_0xa35433(0x2b8)!==_0xa35433(0x2b8)){if(!_0x4e8fa5[_0xa35433(0x4b6)](_0x4d54ad))return!![];}else{if(_0x4b3b43[_0xa35433(0x2fe)](_0x3f9f3d))return![];}}return!![];}else{if(_0x380cb4['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0xa35433(0x247)!==_0xa35433(0x247)){const _0x2f1d33=_0x5e4e27[_0xa35433(0x351)](_0x213162);if(_0x2f1d33[_0xa35433(0x254)][_0xa35433(0x356)]>0x0){const _0x3cac8b=_0x2f1d33[_0xa35433(0x254)];if(!_0x3cac8b['includes'](this[_0xa35433(0x254)]()))return![];}if(_0x2f1d33[_0xa35433(0x28d)][_0xa35433(0x356)]>0x0){const _0x16e649=_0x2f1d33[_0xa35433(0x28d)];let _0x49c71f=[this[_0xa35433(0x254)]()];_0x581b9b[_0xa35433(0x27a)]&&this[_0xa35433(0x264)]&&(_0x49c71f=this[_0xa35433(0x264)]());if(_0x16e649['filter'](_0x535a24=>_0x49c71f[_0xa35433(0x486)](_0x535a24))['length']<=0x0)return![];}return _0x4372cd['prototype'][_0xa35433(0x3cf)]['call'](this,_0x49eb40);}else{const _0x1d9691=RegExp['$1'][_0xa35433(0x34d)](',');for(const _0x5cd229 of _0x1d9691){const _0x43f26c=DataManager[_0xa35433(0x2f4)](_0x5cd229);if(!_0x43f26c)continue;if(_0x4b3b43['hasSkill'](_0x43f26c))return![];}return!![];}}}return!![];},Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x269)]=function(_0x11de09){const _0x2da367=_0x3f7c0c,_0x474c18=_0x11de09[_0x2da367(0x4de)],_0x190c15=VisuMZ[_0x2da367(0x209)][_0x2da367(0x2f1)];if(_0x190c15[_0x11de09['id']])return _0x190c15[_0x11de09['id']][_0x2da367(0x3da)](this,_0x11de09);else{if(_0x2da367(0x4e4)==='iJTjn'){const _0x3ae912=_0x147388(_0x38ff34['$1']),_0x308c7d=_0x3ffeb6[_0x2da367(0x497)](_0x3ae912);_0x1dcd90[_0x2da367(0x209)]['stateAddJS'][_0xdf774f['id']]=new _0x3bd038(_0x2da367(0x2a4),_0x308c7d);}else return!![];}},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x46e)]=Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x474)],Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x474)]=function(_0x35ef0f){const _0x101a9e=_0x3f7c0c,_0x322bfd=this[_0x101a9e(0x32f)](_0x35ef0f),_0x52a011=_0x322bfd?_0x322bfd[_0x101a9e(0x339)]:'';if(_0x322bfd)this['alterSkillName'](_0x322bfd);VisuMZ['SkillsStatesCore'][_0x101a9e(0x46e)][_0x101a9e(0x3da)](this,_0x35ef0f);if(_0x322bfd)_0x322bfd[_0x101a9e(0x339)]=_0x52a011;},Window_SkillList[_0x3f7c0c(0x3b6)][_0x3f7c0c(0x1bc)]=function(_0x408f55){const _0x58c819=_0x3f7c0c;if(_0x408f55&&_0x408f55[_0x58c819(0x4de)]['match'](/<LIST NAME:[ ](.*)>/i)){if(_0x58c819(0x306)===_0x58c819(0x306)){_0x408f55[_0x58c819(0x339)]=String(RegExp['$1'])[_0x58c819(0x4b1)]();for(;;){if('rnvpc'===_0x58c819(0x267)){if(_0x408f55['name']['match'](/\\V\[(\d+)\]/gi))_0x408f55[_0x58c819(0x339)]=_0x408f55[_0x58c819(0x339)][_0x58c819(0x3ae)](/\\V\[(\d+)\]/gi,(_0x352a9c,_0xa898fd)=>$gameVariables['value'](parseInt(_0xa898fd)));else break;}else{if(!_0x2357e9['VisuMZ_1_ItemsEquipsCore'])return![];else return this[_0x58c819(0x441)]()?!![]:_0x362795[_0x58c819(0x209)]['Settings'][_0x58c819(0x24e)][_0x58c819(0x201)];}}}else _0x17fcab[_0x58c819(0x209)][_0x58c819(0x4a7)][_0x58c819(0x1ea)][_0x58c819(0x210)][_0x58c819(0x3da)](this,_0x32e881);}},Window_SkillList['prototype'][_0x3f7c0c(0x47d)]=function(_0x1a0a57,_0x5d81f8,_0x43d52c,_0xd7719c){const _0x404c71=_0x3f7c0c;Window_Base[_0x404c71(0x3b6)][_0x404c71(0x47d)]['call'](this,this[_0x404c71(0x4d1)],_0x1a0a57,_0x5d81f8,_0x43d52c,_0xd7719c);},Window_SkillList[_0x3f7c0c(0x3b6)]['setStatusWindow']=function(_0xce3f11){const _0x341a29=_0x3f7c0c;this[_0x341a29(0x1e4)]=_0xce3f11,this['callUpdateHelp']();},VisuMZ[_0x3f7c0c(0x209)][_0x3f7c0c(0x453)]=Window_SkillList['prototype'][_0x3f7c0c(0x3f1)],Window_SkillList['prototype'][_0x3f7c0c(0x3f1)]=function(){const _0x574c2f=_0x3f7c0c;VisuMZ[_0x574c2f(0x209)]['Window_SkillList_updateHelp'][_0x574c2f(0x3da)](this),this['_statusWindow']&&this['_statusWindow'][_0x574c2f(0x1dd)]===Window_ShopStatus&&('tGMQn'===_0x574c2f(0x41e)?this[_0x574c2f(0x1e4)][_0x574c2f(0x4d8)](this[_0x574c2f(0x3b0)]()):_0xc1ee18[_0x574c2f(0x2b1)]((_0x175319,_0x5526f3)=>{const _0x2fe582=_0x574c2f,_0x54f5af=_0x175319[_0x2fe582(0x2d5)],_0x15a288=_0x5526f3['priority'];if(_0x54f5af!==_0x15a288)return _0x15a288-_0x54f5af;return _0x175319-_0x5526f3;}));};