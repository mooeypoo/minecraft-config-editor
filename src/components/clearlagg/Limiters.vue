<template>
  <div class="px-5 pb-5">
    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['chunk-limiter'].enabled"
        label="Limit new chunk generation"
        persistent-hint
        hint="NOT RECOMMENDED. Disable new chunk generation, or just put a cap on how many can load at once. May cause many bugs with Spigot 1.8+"
      ></v-switch>
      <v-alert
        class="mt-5"
        v-if="$store.state.file.json['chunk-limiter'].enabled"
        type="warning"
      >Unstable on spigot builds! Beware!</v-alert>
    </v-card-title>
    <v-row
      class="mx-5"
      v-if="$store.state.file.json['chunk-limiter'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['chunk-limiter']['limit']"
          :rules="numRule"
          :disabled="!$store.state.file.json['chunk-limiter'].enabled"
          hint="How many chunks can be loaded before the limit is imposed"
          persistent-hint
          label="Maximum chunks loaded"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row
      class="mx-5"
      v-if="$store.state.file.json['chunk-limiter'].enabled"
    >
      <v-col
      >
        <v-checkbox
          label="Allow creating new chunks"
          hint="Enables or disables chunk creation. false would disallow new chunks"
          persistent-hint
          :disabled="!$store.state.file.json['chunk-limiter'].enabled"
          v-model="$store.state.file.json['chunk-limiter']['create-new-chunks']"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['hopper-limiter'].enabled"
        label="Limit hopper item transfers per chunk"
        persistent-hint
        hint="Limits the amount of item transfers for all the hoppers in a single chunk"
      ></v-switch>
    </v-card-title>
    <v-row
      class="mt-5 mx-5"
      v-if="$store.state.file.json['hopper-limiter'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['hopper-limiter']['transfer-limit']"
          :rules="numRule"
          :disabled="!$store.state.file.json['hopper-limiter'].enabled"
          hint="How many transfers per check interval until the hopper should be disabled"
          persistent-hint
          label="Hopper transfer limit"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['hopper-limiter']['check-interval']"
          :rules="numRule"
          :disabled="!$store.state.file.json['hopper-limiter'].enabled"
          label="Reset interval"
          hint="In seconds, on what interval should the transfer limit be reset"
          persistent-hint
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['player-speed-limiter'].enabled"
        label="Limit player speed"
        persistent-hint
        hint="This limits how fast a user can move by walking or flying in a single tick (20 ticks a second)"
      ></v-switch>
    </v-card-title>
    <v-card-text
      v-if="$store.state.file.json['player-speed-limiter'].enabled"
    >
      It is highly recommend you use this on servers with increased player-speed/fly to prevent chunk overload<br />
      You may also use Spigot's internal speed limiters to achieve the same goal if present on your version (better performance)
    </v-card-text>
    <v-row
      class="mt-5 mx-5"
      v-if="$store.state.file.json['player-speed-limiter'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['player-speed-limiter']['move-max-speed']"
          :rules="fractionRule"
          :disabled="!$store.state.file.json['player-speed-limiter'].enabled"
          hint="Fractions of 20 ticks per second"
          persistent-hint
          label="Maximum speed on foot"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['player-speed-limiter']['fly-max-speed']"
          :rules="fractionRule"
          :disabled="!$store.state.file.json['player-speed-limiter'].enabled"
          hint="Fractions of 20 ticks per second"
          persistent-hint
          label="Maximum speed while flying"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['mob-breeding-limiter'].enabled"
        label="Limit mobs breeding"
        persistent-hint
        hint="Limits the amount baby and adult animals within given radius. This can be very effective for reducing lag, since entity-collisions are computationally expensive."
      ></v-switch>
    </v-card-title>
    <v-row
      class="mt-5 mx-5"
      v-if="$store.state.file.json['mob-breeding-limiter'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['mob-breeding-limiter']['max-mobs']"
          :rules="numRule"
          :disabled="!$store.state.file.json['mob-breeding-limiter'].enabled"
          hint="How many bably/adult animals are allowed within the 'check-radius'"
          persistent-hint
          label="Maximum animals allowed within the radius"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['mob-breeding-limiter']['check-radius']"
          :rules="numRule"
          :disabled="!$store.state.file.json['mob-breeding-limiter'].enabled"
          hint="The radius of what clearlag will check for 'max-mobs'"
          persistent-hint
          label="Radius"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['mobegg-limiter'].enabled"
        label="Limit mob egg spawners"
        persistent-hint
        hint="limits the mob egg spawners so players cannot 'overload' the server with them"
      ></v-switch>
    </v-card-title>
    <v-row
      class="mt-5 mx-5"
      v-if="$store.state.file.json['mobegg-limiter'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['mobegg-limiter']['max-mobs']"
          :rules="numRule"
          :disabled="!$store.state.file.json['mobegg-limiter'].enabled"
          hint="How many entities may be in the radius before the spawning is blocked"
          persistent-hint
          label="Maximum entities within the radius"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['mobegg-limiter']['check-radius']"
          :rules="numRule"
          :disabled="!$store.state.file.json['mobegg-limiter'].enabled"
          hint="The radius clearlag will check for nearby entities"
          persistent-hint
          label="Radius"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['tnt-minecart'].enabled"
        label="Limit TNT minecarts"
        persistent-hint
        hint="This limits the number of allowed TNT minecarts within a given radius"
      ></v-switch>
    </v-card-title>
    <v-row
      class="mt-5 mx-5"
      v-if="$store.state.file.json['tnt-minecart'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['tnt-minecart']['max']"
          :rules="numRule"
          :disabled="!$store.state.file.json['tnt-minecart'].enabled"
          hint="Maximum number of TNT minecarts within the radius"
          persistent-hint
          label="Maximum TNT Minecarts"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['tnt-minecart']['radius']"
          :rules="numRule"
          :disabled="!$store.state.file.json['tnt-minecart'].enabled"
          hint="Radius within which ClearLagg will check for the maximum amount"
          persistent-hint
          label="Radius"
        ></v-text-field>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'ClearLaggLimiters',
  data: () => ({
    numRule: [
      v => /^[0-9]*$/.test(v) || 'Times or durations must be numbers only.'
    ],
    fractionRule: [
      v => /0(\.\d+)?|1\.0/.test(v) || 'Use numerical fractions only.',
      v => (v <= 1 && v >= 0) || 'Fractions must be betwen 0 and 1'
    ]
  })
}
</script>
