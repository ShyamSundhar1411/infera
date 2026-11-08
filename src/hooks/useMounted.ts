"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only in the browser. Model output can differ by a few float bits
 * between Node and the browser, so playgrounds render after mount.
 */
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
