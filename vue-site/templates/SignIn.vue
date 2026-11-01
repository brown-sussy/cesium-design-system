<script setup lang="ts">
import { ref } from 'vue';
import { Button, Checkbox, Field, Icon, Input } from '../../vue';

/**
 * Sign-in page — a single centred card over a gridded void. No split screen,
 * no marketing panel: one job, one column, one primary action.
 *
 * The password label carries a "Forgot?" link, which is why `Field` grew a
 * `#label` slot: a string prop cannot hold a second control.
 */
const email = ref('');
const password = ref('');
const remember = ref(true);
</script>

<template>
  <div class="tpl tpl--centred tpl-signin">
    <div class="tpl-signin__card">
      <span class="tpl-signin__brand">
        <span class="tpl-signin__mark"><Icon name="globe" :size="13" /></span>
        Meridian
      </span>

      <h1 class="tpl-signin__title">Sign in</h1>
      <p class="cs-t-sm tpl-signin__lede">Use the account your workspace administrator issued.</p>

      <form class="tpl-signin__form" @submit.prevent>
        <Field label="Email" html-for="tpl-email">
          <Input
            id="tpl-email"
            v-model="email"
            type="email"
            autocomplete="username"
            placeholder="you@meridian.systems"
          />
        </Field>

        <Field html-for="tpl-password">
          <template #label>
            <span class="tpl-signin__label-row">
              <span>Password</span>
              <a class="tpl-signin__link" href="#">Forgot?</a>
            </span>
          </template>
          <Input
            id="tpl-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••••"
          />
        </Field>

        <Checkbox v-model="remember" label="Keep me signed in for 30 days" />

        <Button type="submit" variant="primary" block>Continue</Button>
      </form>

      <div class="tpl-signin__rule">
        <span class="tpl-signin__rule-line" />
        <span class="cs-t-2xs cs-dimmer tpl-signin__or">or</span>
        <span class="tpl-signin__rule-line" />
      </div>

      <Button variant="secondary" block>
        <template #icon-left><Icon name="command" :size="13" /></template>
        Continue with SSO
      </Button>

      <p class="cs-t-xs cs-dimmer tpl-signin__foot">
        No account?
        <a class="tpl-signin__link tpl-signin__link--muted" href="#">Request access</a>
      </p>
    </div>

    <p class="cs-mono cs-t-2xs cs-dimmer tpl-signin__compliance">
      SSO ENFORCED · SOC 2 TYPE II · EU-WEST-1
    </p>
  </div>
</template>
