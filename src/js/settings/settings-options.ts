// # TYPESCRIPT
// ## TS - TYPES
import type { SettingsOption, SettingsGroup } from "./game-setting-interfaces";

// # FUNCTIONALITY
// ## FUNCTIONS
export function renderSettingsGroup(group: SettingsGroup): string {
  return `
    <fieldset class="settings-group">
      ${renderLegend(group)}
      <div class="settings-group__options">
        ${group.options.map((option) => renderOption(group, option)).join("")}
      </div>
    </fieldset>
  `;
}

function renderLegend(group: SettingsGroup): string {
  return `
    <legend class="settings-group__legend">
      <img class="settings-group__icon" src="${group.iconPath}" alt="" aria-hidden="true">
      <span>${group.legend}</span>
    </legend>
  `;
}

function renderOption(group: SettingsGroup, option: SettingsOption): string {
  const isChecked = option.value === group.selectedValue;
  const checkedAttribute = isChecked ? "checked" : "";
  const marker = renderSelectionMarker(isChecked, group.showSelectionMarker);

  return `
    <label class="settings-option">
      <input class="settings-option__input" type="radio" name="${group.name}" value="${option.value}" ${checkedAttribute}>
      <span class="settings-option__radio" aria-hidden="true"></span>
      <span class="settings-option__label">${option.label}</span>
      ${marker}
    </label>
  `;
}

function renderSelectionMarker(_isChecked: boolean, isEnabled = false): string {
  if (!isEnabled) {
    return "";
  }
  return `
    <span class="settings-option__marker" aria-hidden="true"></span>
  `;
}