// ------------ IMPORTS ------------//
import type { SettingsOption, SettingsGroup } from "../../lib/pages/settings/settings-interfaces";

// ------------ FUNCTIONS ------------//

/**
 * Renders one complete settings group.
 *
 * @param group - The settings-group configuration.
 * @returns The rendered fieldset markup.
 */
export function renderSettingsGroup(group: SettingsGroup): string {
  return `
    <fieldset class="settings-group">
    ${renderLegend(group)}
      <div class="settings-group__options">
        ${renderOptions(group)}
      </div>
    </fieldset>
  `;
}

/**
 * Renders the legend of a settings group.
 *
 * @param group - The settings-group configuration.
 * @returns The rendered legend markup.
 */
function renderLegend(group: SettingsGroup): string {
  return `
    <legend class="settings-group__legend">
      <img class="settings-group__icon" src="${group.iconPath}" alt="" aria-hidden="true">
      <span>${group.legend}</span>
    </legend>
  `;
}

/**
 * Renders all selectable options of a settings group.
 *
 * @param group - The settings-group configuration.
 * @returns The rendered options markup.
 */
function renderOptions(group: SettingsGroup): string {
  return group.options.map((option) => renderOption(group, option)).join("");
}

/**
 * Renders one selectable settings option.
 *
 * @param group - The parent settings-group configuration.
 * @param option - The option to render.
 * @returns The rendered option markup.
 */
function renderOption(group: SettingsGroup, option: SettingsOption): string {
  const isChecked = option.value === group.selectedValue;

  return `
    <label class="settings-option">
      ${renderOptionInput(group, option, isChecked)}
      <span class="settings-option__radio" aria-hidden="true"></span>
      <span class="settings-option__label">${option.label}</span>
      ${renderSelectionMarker(isChecked, group.showSelectionMarker)}
    </label>
  `;
}

/**
 * Renders the radio input of one settings option.
 *
 * @param group - The parent settings-group configuration.
 * @param option - The option to render.
 * @param isChecked - Whether the option is selected.
 * @returns The rendered radio-input markup.
 */
function renderOptionInput(group: SettingsGroup, option: SettingsOption, isChecked: boolean): string {
  return `<input class="settings-option__input" type="radio" name="${group.name}" value="${option.value}" ${getCheckedAttribute(isChecked)}>`;
}

/**
 * Creates the checked attribute for a selected option.
 *
 * @param isChecked - Whether the option is selected.
 * @returns The checked attribute or an empty string.
 */
function getCheckedAttribute(isChecked: boolean): string {
  return isChecked ? "checked" : "";
}

/**
 * Renders the optional marker of a selected option.
 *
 * @param isChecked - Whether the option is selected.
 * @param isEnabled - Whether the marker is enabled.
 * @returns The marker markup or an empty string.
 */
function renderSelectionMarker(isChecked: boolean, isEnabled = false): string {
  if (!isChecked || !isEnabled) {
    return "";
  }

  return `
    <span class="settings-option__marker" aria-hidden="true"></span>
  `;
}