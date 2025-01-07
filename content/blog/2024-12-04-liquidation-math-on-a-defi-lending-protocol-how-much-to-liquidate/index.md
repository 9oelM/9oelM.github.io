---
title: "Liquidation math on a DeFi lending protocol: how much to liquidate?"
date: "2024-12-04T09:00:00.009Z"
tags: ["blockchain", "dev"]
tab: "post"
keywords: ["defi", "lending", "liquidation", "code", "math"]
---

_A prerequisite to understanding this post is [Technical intro to DeFi lending protocols with zkLend codebase as an example](https://9oelm.github.io/2023-10-26-technical-intro-to-defi-lending-protocols-with-zklend-codebase-as-an-example/)._

**Liquidation in DeFi lending** occurs when a borrower's loan-to-value (LTV) ratio exceeds the protocol's liquidation threshold, either due to a drop in collateral value or an increase in the borrowed asset's value. This mechanism protects the platform's solvency by ensuring loans remain adequately backed. 

When the threshold is breached, smart contracts allow anyone to trigger liquidation, repaying part of the debt and receiving collateral plus a bonus as an incentive. This process mitigates insolvency risks caused by market volatility.

But for this specific post, let's talk about **_how to calculate the exact amount to be repaid in liquidation_**. I'm simply writing about this because no one on the Internet is talking about this, but this is much needed information when you are configuring your own liquidator or lending protocol. Otherwise, you will have to 'brute force' the amount to liquidate, which is definitely something that you don't want.

## Borrow factor

Review these docs:

- [Kamino Finance](https://docs.kamino.finance/products/borrow-lend/position-risk-and-liquidations/borrow-factors)
- [Euler Finance](https://docs-v1.euler.finance/app/ui/lending-and-borrowing-example#borrowing)

A borrow factor is a risk-adjusted borrowing capacity ratio assigned to each asset. We follow Euler Finance's convention: it is the percentage of the asset that can be borrowed against a certain amount of collateral. It saves a room for price fluctuations in case of liquidation. Essentially, it has the same goal as the [liquidation threshold](https://docs.aave.com/risk/asset-risk/risk-parameters#liquidation-threshold) in some of the other protocols, which is to protect borrowers from sharp price fluctuations and potential liquidations. 

For example, given this table below:

|                   | TON   | USDT  |
| ----------------- | ----- | ----- |
| Collateral factor | 90%   | 90%   |
| Borrow factor     | 70%   | 100%  |
| Price             | 5 USD | 1 USD |

Deposit USDT, borrow TON:

1. You deposit 100 USDT = 100 USD
2. When you want to borrow TON, you can only borrow (original value of collateral) x (collateral factor of the collateral) x (borrow factor of the borrowing asset) = 100 x 0.9 x 0.7 = 63 USD.

Deposit TON, borrow USDT:

1. You deposit 20 TON = 100 USD
2. When you want to borrow USDT, you can only borrow (original value of collateral) x (collateral factor of the collateral) x (borrow factor of the borrowing asset) = 100 x 0.9 x 1 = 90 USD.

Generally speaking, the borrow factor helps manage risk within the protocol by accounting for volatility. Lower borrow factors are assigned to more volatile assets, allowing less borrowing against them, while more stable assets may have higher borrow factors.

## Collateral factor and collateralization ratio

When a user is withdrawing or borrowing, the protocol uses the collateral factor as well as borrow factor to check if the user is still overcollateralized after withdrawal or borrowing. The collateral factor on other protocols is also sometimes called ["LTV", which stands for loan-to-value](https://aave.com/docs/concepts/risks#collateral-risk). 

Borrow and collateral factors work together to represent collateralization of a user, which is called "collateralization ratio":

$$
\text{Collateralization ratio} = \frac{\sum (\text{Collateral Factor}_i \times \text{Collateral Value in USD}_i)}{\sum (\frac{\text{Borrowing Value in USD}_i}{\text{Borrow Factor}_i })}
$$

where $0 \leq \text{Collateral factor} \leq 1$ and $0 \leq \text{Borrow factor} \leq 1$.

For example, given the following table:

|                   | TON   | USDT    |
| ----------------- | ----- | ------- |
| Collateral factor | 90%   | 90%     |
| Borrow factor     | 70%   | 100%    |
| Price             | 5 USD | 1 USD   |
| Deposited amount  | 5 USD | 1 USD   |
| Borrowed amount   | 2 USD | 0.3 USD |

The collateralization ratio would be:

$$
\text{Collateralization ratio} = \frac{(0.9 \times 5) + (0.9 \times 1)}{\frac{2}{0.7} + \frac{0.3}{1.0}} = \frac{(4.5) + (0.9)}{\frac{2}{0.7} + 0.3} = \frac{5.4}{2.857 + 0.3} = \frac{5.4}{3.157} = 1.71... > 0
$$

In this case, the collateralization ratio is bigger than 0, so this can be the state of the user after user has successfully withdrawn or borrowed some amount from a fully functional protocol. The user needs to keep the collateralization ratio above 1.

For liquidation, the [_health factor_](https://aave.com/help/borrowing/liquidations) is calculated instead.

$$
\text{Health factor} = \frac{\sum (\text{Collateral Factor}_i \times \text{Collateral Value in USD}_i)}{\sum \text{Borrowing Value in USD}_i}
$$

The health factor is always bigger than or equal to the collateralization ratio because we take the borrow factor out, which always deflates the result of the equation. When they are equal, they will always be at the positive infinity.

Using the information from the table above, the health factor would be:

$$
\text{Health factor} = \frac{(0.9 \times 5) + (0.9 \times 1)}{2 + 0.3} = \frac{(4.5) + (0.9)}{2.3} = \frac{5.4}{2.3} = 2.347
$$

As it can be seen, the health factor is greater than the collateralization ratio. The difference between the health factor and the collateralization ratio is a buffer for the borrowers. When the health factor goes below 1, anyone can liquidate that user and make it back to 1 or closer to 1.

## How much to pay for liquidation

The liquidation must happen before the health factor drops 'too much'. What would be 'too much'?: When the value of the collateral is so little that the health factor cannot be recovered back to 1 even after being liquidated. How do we derive the equation? We can use the same health factor equation we have above.

Let's give an example using the variables below, and let's say we are repaying USDT debt and taking away TON collateral during liquidation:

|                                           | TON     | USDT    |
| ----------------------------------------- | ------- | ------- |
| Collateral factor (liquidation threshold) | 80%     | 85%     |
| Deposited amount in USD                   | 5.4 USD | 0.1 USD |
| Borrowed amount in USD                    | 0.1 USD | 5 USD   |
| Liquidation bonus                         | 6%      | 7%      |

Let's expand:

$$
\text{Health factor} = \frac{\sum (\text{Collateral Factor}_i \times \text{Collateral Value in USD}_i)}{\sum \text{Borrowing Value in USD}_i}
$$

into

$$
\text{HF}_{\text{after liquidation}} = \frac{CF_{TON} \times (CV_{TON} - RV_{USDT}(1 + LF_{TON})) + CF_{USDT} \times CV_{USDT}}{DV_{TON} + DV_{USDT} - RV_{USDT}}
$$

where

- $\text{HF}_{\text{after liquidation}}$ is the health factor _after_ liquidation takes place.
- $\text{CF}_{asset}$ is the collateral factor of an $asset$.
- $\text{CV}_{asset}$ is the value of an $asset$ deposited as a collateral in USD.
- $\text{RV}_{asset}$ is the value of repayment on the debt of an $asset$ in USD.
- $\text{DV}_{asset}$ is the value of the debt of an $asset$ in USD.
- $\text{LF}_{asset}$ is the liquidation bonus factor of an $asset$.

Notice that the equation is just an equation for the health factor in the post-liquidation state. $CF_{TON} \times (CV_{TON} - RV_{USDT}(1 + LF_{TON}))$ represents the discounted collateral left after a part of TON collateral including the liquidation bonus is captured in exchange for the USDT debt repayment by the liquidator. $CF_{USDT} \times CV_{USDT}$ represents the discounted USDT collateral. $DV_{TON} + DV_{USDT} - RV_{USDT}$ represents total debt after the USDT debt repayment.

Let's rearrange the equation so we can solve for $\text{RV}_{USDT}$:

$$
\text{HF}_{\text{after liquidation}} = \frac{CF_{TON} \times (CV_{TON} - RV_{USDT}(1 + LF_{TON})) + CF_{USDT} \times CV_{USDT}}{DV_{TON} + DV_{USDT} - RV_{USDT}}
$$

$$
\implies \text{HF}_{\text{after liquidation}}(DV_{TON}) + \text{HF}_{\text{after liquidation}}(DV_{USDT}) - \text{HF}_{\text{after liquidation}}(RV_{USDT})
$$

$$
= (CF_{TON})(CV_{TON}) - (RV_{USDT})(CF_{TON})(1 + LF_{TON})) + (CF_{USDT})(CV_{USDT})
$$

$$
\implies (RV_{USDT})(CF_{TON})(1 + LF_{TON})) - \text{HF}_{\text{after liquidation}}(RV_{USDT}
$$

$$
= -\text{HF}_{\text{after liquidation}}(DV_{TON}) -\text{HF}_{\text{after liquidation}}(DV_{USDT}) + (CF_{TON})(CV_{TON}) + (CF_{USDT})(CV_{USDT})
$$

$$
\implies (RV_{USDT})((CF_{TON})(1 + LF_{TON})) - \text{HF}_{\text{after liquidation}})
$$

$$
= -\text{HF}_{\text{after liquidation}}(DV_{TON} + DV_{USDT}) + \sum\limits_{i}{(CF_i \times CV_i)}
$$

$$
\implies (RV_{USDT})((CF_{TON})(1 + LF_{TON})) - \text{HF}_{\text{after liquidation}})
$$

$$
= -\text{HF}_{\text{after liquidation}}(\sum\limits_{i}{DV_i}) + \sum\limits_{i}{(CF_i \times CV_i)}
$$

$$
\implies RV_{USDT} = \frac{-\text{HF}_{\text{after liquidation}}(\sum\limits_{i}{DV_i}) + \sum\limits_{i}{(CF_i \times CV_i)}}{((CF_{TON})(1 + LF_{TON})) - \text{HF}_{\text{after liquidation}}}
$$

Now that we have the equation ready, substitute the variables. We know that:

$$
\text{HF}_{\text{after liquidation}} \le 1
$$

, so let's substitute:

$$
\text{HF}_{\text{after liquidation}} = 1
$$

in this equation below:

$$
RV_{USDT} = \frac{-(1)(5 + 0.1) + (0.8 \times 5.4 + 0.85 \times 0.1)}{((0.8)(1 + 0.06)) - 1}
$$

We can run this Python script to confirm the result:

```py
RV_USDT_NUMERATOR = (-1 * (0.1 + 5) + (0.8 * 5.4 + 0.85 * 0.1))
RV_USDT_DENOMINATOR = ((0.8) * (1 + 0.06) - 1)
RV_USDT = RV_USDT_NUMERATOR / RV_USDT_DENOMINATOR

print(RV_USDT_NUMERATOR)
print(RV_USDT_DENOMINATOR)
print(RV_USDT)

HF_CHECK_NUMERATOR = 0.8 * (5.4 - RV_USDT * (1 + 0.06)) + 0.85 * 0.1
HF_CHECK_DENOMINATOR = 5.1 - RV_USDT
HF = HF_CHECK_NUMERATOR/HF_CHECK_DENOMINATOR

print(HF_CHECK_NUMERATOR)
print(HF_CHECK_DENOMINATOR)
print(HF)
```

The console will print:

```bash
-0.6949999999999994 # RV_USDT_NUMERATOR
-0.1519999999999999 # RV_USDT_DENOMINATOR
4.57236842105263 # RV_USDT
0.5276315789473698 # HF_CHECK_NUMERATOR
0.5276315789473696 # HF_CHECK_DENOMINATOR
1.0000000000000004 # HF
```

Disregarding the floating point number errors, we can confirm that we deduced the correct $RV_{USDT}$.

We can now generalize the equation further, from:

$$
RV_{USDT} = \frac{-\text{HF}_{\text{after liquidation}}(\sum\limits_{i}{DV_i}) + \sum\limits_{i}{(CF_i \times CV_i)}}{((CF_{TON})(1 + LF_{TON})) - \text{HF}_{\text{after liquidation}}}
$$

to:

$$
RV_{\text{repaid asset}} = \frac{-\text{HF}_{\text{after liquidation}}(\sum\limits_{i}{DV_i}) + \sum\limits_{i}{(CF_i \times CV_i)}}{(CF_{\text{liquidated asset}})(1 + LF\_{\text{liquidated asset}}) - \text{HF}_{\text{after liquidation}}}
$$

However, in some cases where more than two assets are borrowed or deposited as collaterals, $RV_{\text{repaid asset}}$ can exceed $DV_{\text{repaid asset}}$ or $CV_{\text{liquidated asset}}$. In either case, repayment is not valid because repayment amount must be smaller than the debt and must be smaller than the captured collateral amount plus liquidation bonus in order for the liquidation to work.

In such cases, $\text{Final Repaid Amount}\_{\text{repaid asset}}$ needs to be reduced down to $min(RV\_{\text{repaid asset}}, min(DV\_{\text{repaid asset}}, \frac{CV\_{\text{liquidated asset}}}{1 + LF\_{\text{liquidated asset}}}))$.

Below, we review all of the different possibilities for liquidation. We use $\text{USDT} = \text{repaid asset}$, and $\text{TON} = \text{liquidated asset}$.

1. $\text{HF} \ge 1$

|                                           | TON     | USDT    |
| ----------------------------------------- | ------- | ------- |
| Collateral factor (liquidation threshold) | 80%     | 85%     |
| Deposited amount in USD                   | 5.4 USD | 0.1 USD |
| Borrowed amount in USD                    | 0.1 USD | 0 USD   |
| Liquidation bonus                         | 6%      | 7%      |

In this case, there can't be a liquidation on this account, because the user's position is healthy:

$$
\text{HF} = \frac{0.8 \times 5.4 + 0.85 \times 0.1}{0.1} \ge 1
$$

2. $\text{HF} \le 1$ and $RV\_{\text{repaid asset}} = min(RV\_{\text{repaid asset}}, min(DV\_{\text{repaid asset}}, \frac{CV\_{\text{liquidated asset}}}{1 + LF\_{\text{liquidated asset}}}))$

|                                           | TON     | USDT    |
| ----------------------------------------- | ------- | ------- |
| Collateral factor (liquidation threshold) | 80%     | 85%     |
| Deposited amount in USD                   | 5.4 USD | 0.1 USD |
| Borrowed amount in USD                    | 0.1 USD | 5 USD   |
| Liquidation bonus                         | 6%      | 7%      |

This is the example we used previously. HF is smaller than 1:

$$
\text{HF} = \frac{0.8 \times 5.4 + 0.85 \times 0.1}{0.1 + 5} = \frac{4.405}{5.1} \le 1
$$

and $RV_{\text{repaid asset}} = min(RV_{\text{repaid asset}}, min(DV_{\text{repaid asset}}, \frac{CV_{\text{liquidated asset}}}{1 + LF_{\text{liquidated asset}}})$:

$$
RV_{\text{repaid asset}} = \frac{-\text{HF}_{\text{after liquidation}}(\sum\limits_{i}{DV_i}) + \sum\limits_{i}{(CF_i \times CV_i)}}{((CF_{\text{liquidated asset}})(1 + LF_{\text{liquidated asset}})) - \text{HF}_{\text{after liquidation}}}
$$

$$
\implies RV_{\text{USDT}} = \frac{-(1)(5 + 0.1) + (0.8 \times 5.4 + 0.85 \times 0.1)}{((0.8)(1 + 0.06)) - 1}
$$

$$
\implies RV_{\text{USDT}} = 4.57236842105263...
$$

3. $\text{HF} \le 1$ and $\text{Final Repaid Amount}\_{\text{repaid asset}} = \frac{CV\_{\text{liquidated asset}}}{1 + LF\_{\text{liquidated asset}}} = min(RV\_{\text{repaid asset}}, min(DV\_{\text{repaid asset}}, \frac{CV\_{\text{liquidated asset}}}{1 + LF\_{\text{liquidated asset}}})$

Put simply, this is when the amount of collateral to be liquidated isn't enough to bring HF back to 1, because the user has multiple collaterals.

|                                           | TON     | USDT    |
| ----------------------------------------- | ------- | ------- |
| Collateral factor (liquidation threshold) | 80%     | 85%     |
| Deposited amount in USD                   | 3 USD   | 2.5 USD |
| Borrowed amount in USD                    | 0.1 USD | 5 USD   |
| Liquidation bonus                         | 6%      | 7%      |

Calculate HF first:

$$
\text{HF} = \frac{0.8 \times 3 + 0.85 \times 2.5}{0.1 + 5} = \frac{4.525}{5.1} \le 1
$$

$$
RV_{\text{USDT}} = \frac{-(1)(5 + 0.1) + (0.8 \times 3 + 0.85 \times 2.5)}{((0.8)(1 + 0.06)) - 1} = 3.7828947368421026...
$$

$$
3.7828947368421026... \ge CV_{TON} \because CV_{TON} = 3
$$

$$
3.7828947368421026... \le DV_{USDT} \because DV_{USDT} = 5
$$

$$
\implies \text{Final Repaid Amount}_{USDT} = \frac{CV_{\text{TON}}}{1 + LF_{\text{TON}}} = min(RV_{\text{repaid asset}}, min(DV_{\text{repaid asset}}, \frac{CV_{\text{TON}}}{1 + LF_{\text{TON}}})
$$

Therefore, we can only repay $\frac{3}{1 + LF_{\text{TON}}} = \frac{3}{1.06} = 2.830188679....$ in this scenario. HF will not be fully restored back to 1. The denominator exists to account for the liquidation bonus, so that we can get 3 USD as the value of captured collateral plus liquidation bonus, which is the maximum we can get from the deposited USDT collateral. But liquidation should still run regardless.

Here's $\text{HF}_{\text{after liquidation}}$:

$$
\text{HF}_{\text{after liquidation}} = \frac{CF_{TON} \times (CV_{TON} - (\text{Final Repaid Amount}_{USDT})(1 + LF_{\text{TON}})) + CF_{USDT} \times CV_{USDT}}{DV_{TON} + DV_{USDT} - \text{Final Repaid Amount}_{USDT}}
$$

$$
= \frac{0 + CF_{USDT} \times CV_{USDT}}{DV_{TON} + DV_{USDT} - \text{Final Repaid Amount}_{USDT}}
$$

$$
= \frac{0 + 2.5 \times 0.85}{5.1 - 2.5} = \frac{2.125}{2.6} = 0.81730769....
$$

Notice that we will need to liquidate the other collateral to fully recover the health factor back to 1.

4. $DV_{\text{repaid asset}} = min(RV_{\text{repaid asset}}, min(DV_{\text{repaid asset}}, \frac{CV_{\text{liquidated asset}}}{1 + LF_{\text{liquidated asset}}})$

This is when the amount of debt to be repaid isn't enough to bring HF back to 1 because the user has multiple assets in debt, and this amount is smaller than the collateral that can be captured.

|                                           | TON     | USDT    |
| ----------------------------------------- | ------- | ------- |
| Collateral factor (liquidation threshold) | 80%     | 85%     |
| Deposited amount in USD                   | 5.4 USD | 0.1 USD |
| Borrowed amount in USD                    | 2.5 USD | 2.6 USD |
| Liquidation bonus                         | 6%      | 7%      |

Again, we are repaying USDT and liquidating TON:

$$
RV_{\text{USDT}} = \frac{-(1)(2.5 + 2.6) + (0.8 \times 5.4 + 0.85 \times 0.1)}{((0.8)(1 + 0.06)) - 1}
$$

$$
= 4.57236842105263...
$$

This means we want to liquidate 4.57236842105263 USD equivalent of USDT, but we cannot because the user only has 2.6 USD worth of USDT in debt, thus:

$$
\text{Final repaid amount}_{USDT} = min(4.57236842105263, min(2.6, \frac{5.4}{1.06}))
$$

$$
= 2.6
$$

This won't recover HF back to 1. It will require another liquidation to be run to repay TON and liquidate TON.

## Describing the behavior in code

The entire codebase is available on [github.com/9oelM/defi-lending-liquidation](https://github.com/9oelM/defi-lending-liquidation/). If we were to describe the calculation in code, it would look like this. This can actually be useful if you want to scaffold your off-chain liquidation logic:

```ts
function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

export class ScMath {
    public static SCALE = 1000000000000000000000000000n;

    // This function assumes `b` is scaled by `SCALE`
    static bigint_mul(a: bigint, b: bigint): bigint {
        assert(a >= 0, 'a must be gte 0');
        assert(b >= 0, 'b must be gte 0');

        const scaled_product = a * b;

        const result = scaled_product / this.SCALE;

        return result;
    }

    // This function assumes `b` is scaled by `SCALE`
    static bigint_div(a: bigint, b: bigint): bigint {
      assert(a >= 0, 'a must be gte 0');
      assert(b >= 0, 'b must be gte 0');

      const scaled_product = a * this.SCALE;

      const result = scaled_product / b;

      return result;
  }

  static uint_scale_pct(pct: bigint) {
      assert(pct >= 0, 'pct must be gte 0');
      assert(pct <= 100, 'pct must be less than or equal to 100');

      return (pct * this.SCALE) / 100n;
  }

  static bigint_min(...args: bigint[]): bigint {
    return args.reduce((min, current) => (current < min ? current : min), args[0]);
  }
}

export type CalcRepaidValueParams = {
    /**
     * 0 <= target_hf_pct < 100
     * (usually very close to 1)
     */
    target_hf_pct: bigint;
    /**
     * will be in whatever the number of decimal places USD is in
     */
    native_usd_sum_of_debts_without_borrow_factors: bigint;
    /**
     * will be in whatever the number of decimal places USD is in
     */
    native_usd_sum_of_collaterals_with_collateral_factors: bigint;
    liquidated_reserve: {
        /**
         * 0 <= native_collateral_factor < 100n
         */
        native_collateral_factor_pct: bigint;
        /**
         * 0 <= native_collateral_factor < 100n
         */
        native_liquidation_bonus_factor_pct: bigint;
    };
    allow_out_of_boundary_hf_for_test?: boolean;
};

export type CalcMaxLiquidableValueParams = {
    repaid_reserve: {
        repaid_value_native_usd: bigint;
        debt_value_native_usd: bigint;
    };
    liquidated_reserve: {
        collateral_value_native_usd: bigint;
        liquidation_bonus_factor_pct: bigint;
    };
};

export enum MaxLiquidableReason {
    RepaidValue = `RepaidValue`,
    DebtValue = `DebtValue`,
    CollateralValue = `CollateralValue`,
}

export class Liquidation {
    /**
     * Calculates the amount that can be repaid for a given liquidation
     * where `target_hf_pct` is the target health factor percentage.
     *
     * RV_repaid_asset =
     * (-target_hf * ΣDV_repaid_asset + Σ(CF_liquidated_asset_i * CV_liquidated_asset_i))
     * / (CF_liquidated_asset * (1 + LF_liquidated_asset) - target_hf)
     *
     * @returns the value in native usd scale that can recover the health factor back to `target_hf_pct`.
     * The value needs to be fed into `calc_max_liquidable_value` again to calculate the final liquidable value.
     */
    static calc_repaid_value({
        target_hf_pct,
        native_usd_sum_of_debts_without_borrow_factors,
        native_usd_sum_of_collaterals_with_collateral_factors,
        liquidated_reserve: { native_collateral_factor_pct, native_liquidation_bonus_factor_pct },
        allow_out_of_boundary_hf_for_test = false,
    }: CalcRepaidValueParams) {
        if (!allow_out_of_boundary_hf_for_test && (0n > target_hf_pct || target_hf_pct >= 100n)) {
            throw new Error('target_hf_pct must be between 0 and 100');
        }

        if (0n > native_collateral_factor_pct || native_collateral_factor_pct >= 100n) {
            throw new Error('native_collateral_factor_pct must be between 0 and 100');
        }

        if (0n > native_liquidation_bonus_factor_pct || native_liquidation_bonus_factor_pct >= 100n) {
            throw new Error('native_liquidation_bonus_factor_pct must be between 0 and 100');
        }

        if (native_usd_sum_of_debts_without_borrow_factors <= 0n) {
            throw new Error('native_usd_sum_of_debts_without_borrow_factors must be greater than 0');
        }

        if (native_usd_sum_of_collaterals_with_collateral_factors <= 0n) {
            throw new Error('native_usd_sum_of_collaterals_with_collateral_factors must be greater than 0');
        }

        const scaled_target_hf_pct = ScMath.uint_scale_pct(target_hf_pct);
        const scaled_liquidated_reserve = {
            collateral_factor: ScMath.uint_scale_pct(native_collateral_factor_pct),
            liquidation_bonus_factor: ScMath.uint_scale_pct(native_liquidation_bonus_factor_pct),
        };

        // unit: USD
        const numerator =
            ScMath.bigint_mul(native_usd_sum_of_debts_without_borrow_factors, -scaled_target_hf_pct) +
            native_usd_sum_of_collaterals_with_collateral_factors;

        // unit: ScMath.SCALE
        const denominator =
            ScMath.bigint_mul(
                scaled_liquidated_reserve.collateral_factor,
                ScMath.SCALE + scaled_liquidated_reserve.liquidation_bonus_factor,
            ) - scaled_target_hf_pct;

        // unit: USD
        const rv_repaid_asset = ScMath.bigint_div(numerator, denominator);

        // will need to adjust to the native scale of the asset by dividing or multiplying by the number of decimal places
        return rv_repaid_asset;
    }

    /**
     * min(RV_repaid_asset, min(DV_repaid_asset, (CV_liquidated_asset / (1 + LF_liquidated_asset))))
     * Sometimes, it wouldn't be possible to pay back all of RV_repaid_asset due to specific reasons.
     * Calculates the maximum liquidable value.
     *
     * Returned value is in native usd scale.
     */
    static calc_max_liquidable_value({ repaid_reserve, liquidated_reserve }: CalcMaxLiquidableValueParams) {
        const cv_liquidated_asset = liquidated_reserve.collateral_value_native_usd;
        const scaled_lf_liquidated_asset_pct = ScMath.uint_scale_pct(liquidated_reserve.liquidation_bonus_factor_pct);

        const max_caputurable_collateral_native_usd = ScMath.bigint_div(
            cv_liquidated_asset,
            ScMath.SCALE + scaled_lf_liquidated_asset_pct,
        );

        const max_liquidable_value = Liquidation.bigint_min(
            repaid_reserve.repaid_value_native_usd,
            repaid_reserve.debt_value_native_usd,
            max_caputurable_collateral_native_usd,
        );

        if (max_liquidable_value == repaid_reserve.repaid_value_native_usd) {
            return {
                value: max_liquidable_value,
                reason: MaxLiquidableReason.RepaidValue,
            };
        }

        if (max_liquidable_value == repaid_reserve.debt_value_native_usd) {
            return {
                value: max_liquidable_value,
                reason: MaxLiquidableReason.DebtValue,
            };
        }

        return {
            value: max_liquidable_value,
            reason: MaxLiquidableReason.CollateralValue,
        };
    }
}
```

And I've written some test cases that should tell how `Liquidation` class should be used:

```ts
import { ScMath, Liquidation, MaxLiquidableReason } from './liquidation';

type LiquidationParams = {
    collateral_factor_pct: bigint;
    deposit_native_usd: bigint;
    debt_native_usd: bigint;
    liquidation_bonus_pct: bigint;
};

describe(`sdk: liquidation`, () => {
    it(`should give correct rv_repaid_asset`, async () => {
        //                                           TON	USDT
        // Collateral factor (liquidation threshold)	80%	85%
        // Deposited amount in USD	                  5.4 USD	0.1 USD
        // Borrowed amount in USD	                    2.5 USD	2.6 USD
        // Liquidation bonus	                        6%	7%
        const liquidationParams: {
            TON: LiquidationParams;
            USDT: LiquidationParams;
        } = {
            TON: {
                collateral_factor_pct: 80n,
                deposit_native_usd: 540_000_000n,
                debt_native_usd: 250_000_000n,
                liquidation_bonus_pct: 6n,
            },
            USDT: {
                collateral_factor_pct: 85n,
                deposit_native_usd: 10_000_000n,
                debt_native_usd: 260_000_000n,
                liquidation_bonus_pct: 7n,
            },
        };
        const native_usd_sum_of_collaterals_with_collateral_factors =
            ScMath.bigint_mul(
                liquidationParams.TON.deposit_native_usd,
                ScMath.uint_scale_pct(liquidationParams.TON.collateral_factor_pct),
            ) +
            ScMath.bigint_mul(
                liquidationParams.USDT.deposit_native_usd,
                ScMath.uint_scale_pct(liquidationParams.USDT.collateral_factor_pct),
            );

        const rv_usdt = Liquidation.calc_repaid_value({
            target_hf_pct: 99n, // recover back to HF = 99%
            native_usd_sum_of_debts_without_borrow_factors:
                liquidationParams.TON.debt_native_usd + liquidationParams.USDT.debt_native_usd,
            native_usd_sum_of_collaterals_with_collateral_factors,
            liquidated_reserve: {
                native_collateral_factor_pct: liquidationParams.TON.collateral_factor_pct,
                native_liquidation_bonus_factor_pct: liquidationParams.TON.liquidation_bonus_pct,
            },
        });

        // 4.57236842 USD
        expect(453521126n).toEqual(rv_usdt);
    });

    const TARGET_HF = 99n; // recover back to HF = 0.99

    it.each([
        //                                            TON	USDT
        // Collateral factor (liquidation threshold)	80%	85%
        // Deposited amount in USD	                  5.4 USD	0.1 USD
        // Borrowed amount in USD	                    0.1 USD	5 USD
        // Liquidation bonus	                        6%	7%
        {
            params: {
                TON: {
                    collateral_factor_pct: 80n,
                    // 5.4
                    deposit_native_usd: 540_000_000n,
                    // 0.1
                    debt_native_usd: 10_000_000n,
                    liquidation_bonus_pct: 6n,
                },
                USDT: {
                    collateral_factor_pct: 85n,
                    // 0.1
                    deposit_native_usd: 10_000_000n,
                    // 5
                    debt_native_usd: 500_000_000n,
                    liquidation_bonus_pct: 7n,
                },
            },
            /**
             * (−(0.99)(5+0.1)+(0.8×5.4+0.85×0.1))/((0.8)(1 + 0.06) - 0.99) = 4.53521126 USD
             */
            rv: 453521126n,
            /**
             * min(4.53521126, 5, 5.4 / 1.06)
             */
            maxLiquidable: {
                reason: MaxLiquidableReason.RepaidValue,
                value: 453521126n,
            },
        },
        //                                            TON	USDT
        // Collateral factor (liquidation threshold)	80%	85%
        // Deposited amount in USD	                  3 USD	2.5 USD
        // Borrowed amount in USD	                    0.1 USD	5 USD
        // Liquidation bonus                        	6%	7%
        {
            params: {
                TON: {
                    collateral_factor_pct: 80n,
                    // 3
                    deposit_native_usd: 300_000_000n,
                    // 0.1
                    debt_native_usd: 10_000_000n,
                    liquidation_bonus_pct: 6n,
                },
                USDT: {
                    collateral_factor_pct: 85n,
                    // 2.5
                    deposit_native_usd: 250_000_000n,
                    // 5
                    debt_native_usd: 500_000_000n,
                    liquidation_bonus_pct: 7n,
                },
            },
            /**
             * ((−(0.99)(5+0.1))+(0.8×3+0.85×2.5))/(0.8(1 + 0.06) - 0.99) = 3.69014084 USD
             */
            rv: 369014084n,
            maxLiquidable: {
                reason: MaxLiquidableReason.CollateralValue,
                /**
                 * min(3.69014084, 5, 3 / 1.06)
                 *
                 * CV_liquidated_asset / (1 + LF_liquidated_asset) =
                 * 3 / (1 + 0.06) = 2.830188679245283
                 */
                value: 2_83018867n,
            },
        },
        //                                            TON	USDT
        // Collateral factor (liquidation threshold)	80%	85%
        // Deposited amount in USD	                  5.4 USD	0.1 USD
        // Borrowed amount in USD	                    2.5 USD	2.6 USD
        // Liquidation bonus	                        6%	7%
        {
            params: {
                TON: {
                    collateral_factor_pct: 80n,
                    // 5.4
                    deposit_native_usd: 540_000_000n,
                    // 2.5
                    debt_native_usd: 250_000_000n,
                    liquidation_bonus_pct: 6n,
                },
                USDT: {
                    collateral_factor_pct: 85n,
                    // 0.1
                    deposit_native_usd: 10_000_000n,
                    // 2.6
                    debt_native_usd: 260_000_000n,
                    liquidation_bonus_pct: 7n,
                },
            },
            /**
             * ((−(0.99)(2.5+2.6))+(0.8×5.4+0.85×0.1))/(0.8(1 + 0.06) - 0.99) = 4.53521126 USD
             * 4.53521126 USD
             */
            rv: 453521126n,
            /**
             * min(4.53521126, 2.6, 5.4 / 1.06)
             */
            maxLiquidable: {
                reason: MaxLiquidableReason.DebtValue,
                value: 260_000_000n,
            },
        },
    ])(`should give correct max liquidable value: $maxLiquidable`, ({ params, rv, maxLiquidable }) => {
        const native_usd_sum_of_collaterals_with_collateral_factors =
            ScMath.bigint_mul(params.TON.deposit_native_usd, ScMath.uint_scale_pct(params.TON.collateral_factor_pct)) +
            ScMath.bigint_mul(params.USDT.deposit_native_usd, ScMath.uint_scale_pct(params.USDT.collateral_factor_pct));

        const rv_usdt = Liquidation.calc_repaid_value({
            target_hf_pct: TARGET_HF,
            native_usd_sum_of_debts_without_borrow_factors: params.TON.debt_native_usd + params.USDT.debt_native_usd,
            native_usd_sum_of_collaterals_with_collateral_factors,
            liquidated_reserve: {
                native_collateral_factor_pct: params.TON.collateral_factor_pct,
                native_liquidation_bonus_factor_pct: params.TON.liquidation_bonus_pct,
            },
        });

        expect(rv_usdt).toBe(rv);

        const max_liquidable = Liquidation.calc_max_liquidable_value({
            repaid_reserve: {
                repaid_value_native_usd: rv_usdt,
                debt_value_native_usd: params.USDT.debt_native_usd,
            },
            liquidated_reserve: {
                collateral_value_native_usd: params.TON.deposit_native_usd,
                liquidation_bonus_factor_pct: params.TON.liquidation_bonus_pct,
            },
        });

        expect(max_liquidable).toEqual(maxLiquidable);
    });
});
```

That's it! It might seem like a lot when you first get started, but once you understand how we derive the equation for $RV_{\text{asset}}$, the rest will become very clear to you. Cheers and please stay in the loop for the next blockchain post. Thanks!
