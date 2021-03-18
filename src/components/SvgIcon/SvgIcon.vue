<template lang="pug">
svg#pepe(
  aria-hidden="true"
  :class="clazz"
  :style="style"
  @click="onClick")
  use(:xlink:href="symbolId")
</template>

<script>
  import { computed } from 'vue';

  const isStroke = true;

  export default {
    name: 'SvgIcon',
    props: {
      icon: String,
      name: {
        type: String,
        required: true,
      },
      prefix: {
        type: String,
        default: 'icon',
      },
      width: {
          type: String,
          default: ''
      },
      height: {
          type: String,
          default: ''
      },
      scale: String,
      dir: String,
      fill: {
          type: Boolean,
          default: function() {
              return !isStroke
          }
      },
      color: String,
      title: String
    },
    setup(props, context) {
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);

      const clazz = computed(() => {
        let clazzList = 'dd--icon'
        if (props.fill) {
          clazzList += ' dd--fill'
        }
        if (props.dir) {
          clazzList += ` dd--${props.dir}`
        }
        return clazzList
      });

      const style = computed(() => {
        let styleIcon = {}

        let scale = Number(props.scale)
        if (!isNaN(scale)) {
          styleIcon.transform = `scale(${scale})`
        }

        return styleIcon
      });

      const onClick = (e) => {
        context.emit('click', e)
      }

      return {
        symbolId,
        clazz,
        style,
        onClick
      };
    },
  };
</script>

<style lang="scss" scoped>
#pepe {
  // color: red;
  // fill: red;
  stroke-width: 5;
}

.dd--icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  color: currentColor;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
  shape-rendering: geometricPrecision;
}

.dd--fill {
  fill: currentColor;
  stroke: none;
}

.dd--up {
  /* default */
  transform: rotate(0deg);
}

.dd--right {
  transform: rotate(90deg);
}

.dd--down {
  transform: rotate(180deg);
}

.dd--left {
  transform: rotate(-90deg);
}

</style>
