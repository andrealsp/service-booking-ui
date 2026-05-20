import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown, FaSearch, FaMobileAlt, FaPhone } from "react-icons/fa";

import { COUNTRIES, DEFAULT_COUNTRY, findByDialCode } from "@/utils/countries";
import {
  detectLineType,
  digits,
  formatNational,
  splitPhone,
  toE164,
} from "@/utils/phone";

import styles from "./PhoneInput.module.css";

/**
 * Phone input with a searchable country-code picker on the left and a
 * free-form national number on the right.
 *
 *   - Country list is searchable (type to filter by name OR dial code).
 *   - The national portion is formatted live (Brazil ddd-aware).
 *   - When complete, a small pill identifies the line as Mobile / Landline
 *     (only confident for Brazil today — see `detectLineType`).
 *
 * The component emits the canonical E.164 string to the parent via
 * {@code onChange}, e.g. "+5511999991234".
 */
function PhoneInput({
  label = "Phone",
  name = "phoneNumber",
  value = "",
  onChange,
  error,
  required = true,
  disabled = false,
}) {
  // Parse the incoming value (possibly mid-edit) into dial + national parts.
  const initial = useMemo(() => splitPhone(value), [/* parse once */]); // eslint-disable-line react-hooks/exhaustive-deps
  const [country, setCountry] = useState(
    () => findByDialCode(initial.dialCode) || DEFAULT_COUNTRY
  );
  const [national, setNational] = useState(initial.national);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pickerRef = useRef(null);
  const searchRef = useRef(null);

  // If the parent updates `value` externally (e.g. when editing an existing
  // user), re-derive both halves.
  useEffect(() => {
    const parsed = splitPhone(value);
    setCountry((c) =>
      c?.dialCode === parsed.dialCode ? c : findByDialCode(parsed.dialCode) || c
    );
    setNational(parsed.national);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Close the dropdown on outside-click or Escape.
  useEffect(() => {
    function onClick(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPickerOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setPickerOpen(false);
    }
    if (pickerOpen) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
      // Autofocus the search box when opening.
      setTimeout(() => searchRef.current?.focus(), 30);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [pickerOpen]);

  // Emit canonical E.164 to the parent whenever either half changes.
  function emit(nextCountry, nextNational) {
    const canonical = toE164(nextCountry.dialCode, nextNational);
    onChange?.({ target: { name, value: canonical } });
  }

  function handleNationalChange(e) {
    const raw = digits(e.target.value);
    setNational(raw);
    emit(country, raw);
  }

  function selectCountry(c) {
    setCountry(c);
    setPickerOpen(false);
    setSearch("");
    emit(c, national);
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.dialCode.includes(term) ||
        c.code.toLowerCase().includes(term)
    );
  }, [search]);

  const lineType = detectLineType(country.dialCode, national);
  const showLineBadge = digits(national).length >= 8;

  return (
    <div className={styles.group}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      <div
        className={`${styles.row} ${error ? styles.rowError : ""}`}
        ref={pickerRef}
      >
        <button
          type="button"
          className={styles.countryTrigger}
          onClick={() => !disabled && setPickerOpen((v) => !v)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={pickerOpen}
        >
          <span className={styles.flag}>{country.flag}</span>
          <span className={styles.dial}>+{country.dialCode}</span>
          <FaChevronDown className={styles.chev} aria-hidden />
        </button>

        <input
          id={name}
          name={name}
          type="tel"
          autoComplete="tel-national"
          value={formatNational(country.dialCode, national)}
          onChange={handleNationalChange}
          placeholder={
            country.dialCode === "55" ? "(11) 99999-1234" : "Phone number"
          }
          required={required}
          disabled={disabled}
          className={styles.numberInput}
        />

        {showLineBadge && lineType !== "unknown" && (
          <span
            className={`${styles.lineBadge} ${
              lineType === "mobile" ? styles.lineMobile : styles.lineLandline
            }`}
            title={
              lineType === "mobile" ? "Mobile number" : "Landline number"
            }
          >
            {lineType === "mobile" ? <FaMobileAlt /> : <FaPhone />}
            <span className={styles.lineLabel}>
              {lineType === "mobile" ? "Mobile" : "Landline"}
            </span>
          </span>
        )}

        {pickerOpen && (
          <div className={styles.picker} role="listbox">
            <div className={styles.searchWrap}>
              <FaSearch className={styles.searchIcon} aria-hidden />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code"
                className={styles.searchInput}
              />
            </div>
            <ul className={styles.list}>
              {filtered.length === 0 ? (
                <li className={styles.empty}>No country matches</li>
              ) : (
                filtered.map((c) => (
                  <li
                    key={`${c.code}-${c.dialCode}`}
                    role="option"
                    aria-selected={country.code === c.code}
                    className={`${styles.item} ${
                      country.code === c.code ? styles.itemActive : ""
                    }`}
                    onClick={() => selectCountry(c)}
                  >
                    <span className={styles.itemFlag}>{c.flag}</span>
                    <span className={styles.itemName}>{c.name}</span>
                    <span className={styles.itemDial}>+{c.dialCode}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default PhoneInput;
